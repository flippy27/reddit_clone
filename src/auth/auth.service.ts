import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { UserUpdateTokenDto } from 'src/users/dto/update-token.dto';
import { Users } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,

    @InjectRepository(Users)
    private userRepo: Repository<Users>,
  ) {}

  async signIn(body): Promise<any> {
    console.log(body);

    const user = await this.usersService.findOneByEmail(body.email);
    console.log('ESTE', user);
    console.log(body.email);

    //console.log( 'aca '+ JSON.stringify(user) );
    if (!user) {
      throw new UnauthorizedException('here');
    }
    const saltOrRounds = 10;
    const salt = await bcrypt.genSalt(saltOrRounds);
    console.log(salt);

    const { password, ...result } = user;
    const hashedPassword = bcrypt.hashSync(body.password, user.salt);

    const hash = await bcrypt.hash(body.password, 10);
    console.log('jsajsa', password, hashedPassword);

    const isMatch = await bcrypt.compare(hashedPassword, password);
    console.log(isMatch);

    if (hashedPassword == password) {
      const payload = {
        username: user.user_name,
        email: user.email,
        id: user.id,
        role_id: user.role,
      };
      const token = await this.jwtService.signAsync(payload);
      const id = user.id;
      let userTokenDto = new UserUpdateTokenDto();
      userTokenDto.token = token
      this.userRepo.update(id, userTokenDto);
      return {
        access_token: token,
      };
    } else {
      throw new UnauthorizedException('Wrong password');
    }
  }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    console.log('el de abajo', user);

    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
