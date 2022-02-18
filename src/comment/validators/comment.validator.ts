import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from '../dto/createComment.dto';
import { UserService } from '../../user/user.service';
import { CommentService } from '../comment.service';

@Injectable()
export class CommentValidator {
  constructor(
    private readonly userService: UserService,
    private readonly commentService: CommentService,
  ) {}

  async validateCreateComment(createCommentDto: CreateCommentDto) {
    const { user } = createCommentDto;
    const userFound = await this.userService.findOne(user);
    if (!userFound) throw new NotFoundException('User not found.');
  }

  async validateGetComment(id: string) {
    const comment = await this.commentService.detail(id);
    if (!comment) throw new NotFoundException('Comment not found.');
  }
}
