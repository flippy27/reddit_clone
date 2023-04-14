export class CreateCommentDto {
    user_id: number
    parent_id: number
    post_id: number
    comment_content: string
    created_at: Date
    updated_at: Date
}
