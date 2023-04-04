import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
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
    console.log('jsajsa',password, hashedPassword );
    
    
    const isMatch = await bcrypt.compare(hashedPassword, password)
    console.log(isMatch);
    
   
    

    if (hashedPassword== password) {

      const payload = { username: user.user_name, email: user.email, id: user.id, role_id: user.role_id};
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    } else {
      throw new UnauthorizedException('there');
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
