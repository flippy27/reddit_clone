export class CreatePostDto {
    id: number
    name: string
    user_id: number
    theme_id: number
    post_content: string
    vote_count: number
    thread_id: number
    item_type_id: number
    created_at: Date
    updated_at: Date
}
