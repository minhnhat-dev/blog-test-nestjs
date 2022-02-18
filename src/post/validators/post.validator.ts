import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { CreatePostDto } from '../dto/createPost.dto';
import { UpdatePostDto } from '../dto/updatePost.dto';
import { UserService } from '../../user/user.service';
import { PostService } from '../post.service';

@Injectable()
export class PostValidator {
  constructor(
    private readonly userService: UserService,
    private readonly postService: PostService,
  ) {}

  async validateCreate(createPostDto: CreatePostDto) {
    const { user } = createPostDto;
    const userFound = await this.userService.findOne(user);
    if (!userFound) throw new NotFoundException('User not found.');
  }

  async validateUpdate(updatePostDto: UpdatePostDto) {
    return true;
  }

  async validateGetPost(id: string) {
    const post = await this.postService.detail(id);
    if (!post) throw new NotFoundException('Post not found.');
  }
}
