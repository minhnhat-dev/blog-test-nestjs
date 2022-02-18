import {
  Controller,
  Get,
  Query,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PostService } from './post.service';
import { CoreResponse } from '../core/interfaces/coreResponse.interface';
import { CreatePostDto } from './dto/createPost.dto';
import { UpdatePostDto } from './dto/updatePost.dto';
import { QueryPostDto } from './dto/queryPost.dto';
import { CoreTransformInterceptor } from '../core/interceptors/coreTransform.interceptor';
import { PostValidator } from './validators/post.validator';
import { DefaultListQuery } from '../core/decorators/defaultListQuery.decorator';
import { CommentValidator } from '../comment/validators/comment.validator';
import { CreateCommentDto } from '../comment/dto/createComment.dto';
import { UpdateCommentDto } from '../comment/dto/updateComment.dto';
import { QueryCommentDto } from '../comment/dto/queryComment.dto';
import { CommentService } from '../comment/comment.service';

@ApiTags('Post')
@Controller('posts')
@UseInterceptors(CoreTransformInterceptor)
export class PostController {
  constructor(
    private readonly postService: PostService,
    private readonly commentService: CommentService,
    private readonly postValidator: PostValidator,
    private readonly commentValidator: CommentValidator,
  ) {}

  @Get('/')
  @DefaultListQuery()
  async getList(@Query() query: QueryPostDto): Promise<CoreResponse> {
    const { posts, total } = await this.postService.getList(query);
    const data = {
      items: posts,
      total,
    };
    return { data };
  }

  @Post('/')
  async create(@Body() createPostDto: CreatePostDto): Promise<CoreResponse> {
    await this.postValidator.validateCreate(createPostDto);
    const result = await this.postService.create(createPostDto);
    return { data: result };
  }

  @Get(':id')
  async detail(@Param('id') id: string): Promise<CoreResponse> {
    const result = await this.postService.detail(id);
    return { data: result };
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
  ): Promise<CoreResponse> {
    await this.postValidator.validateUpdate(updatePostDto);
    const result = await this.postService.update(id, updatePostDto);
    return { data: result };
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<CoreResponse> {
    await this.postService.delete(id);
    return { status: true };
  }

  /* Comment api */

  @Get('/:id/comments')
  async getComments(
    @Param('id') id: string,
    @Query() queryPath: QueryCommentDto,
  ): Promise<CoreResponse> {
    await this.postValidator.validateGetPost(id);
    const query = { ...queryPath, post: id };
    const result = await this.commentService.getList(query);
    return { data: result };
  }

  @Post('/:id/comments')
  async createComment(
    @Body() createCommentDto: CreateCommentDto,
    @Param('id') id: string,
  ): Promise<CoreResponse> {
    await this.postValidator.validateGetPost(id);
    await this.commentValidator.validateCreateComment(createCommentDto);
    createCommentDto.post = id;
    const result = await this.commentService.create(createCommentDto);
    return { data: result };
  }

  @Get(':id/comments/:commentId')
  async detailComment(
    @Param('id') id: string,
    @Param('commentId') commentId: string,
  ): Promise<CoreResponse> {
    await this.postValidator.validateGetPost(id);
    await this.commentValidator.validateGetComment(commentId);
    const result = await this.commentService.detail(commentId);
    return { data: result };
  }

  @Put(':id/comments/:commentId/')
  async updateComment(
    @Param('id') id: string,
    @Param('commentId') commentId: string,
    @Body() updateCommentDto: UpdateCommentDto,
  ): Promise<CoreResponse> {
    await this.postValidator.validateGetPost(id);
    await this.commentValidator.validateGetComment(commentId);
    const result = await this.commentService.update(
      commentId,
      updateCommentDto,
    );
    return { data: result };
  }

  @Delete(':id/comments/:commentId')
  async deleteComment(
    @Param('id') id: string,
    @Param('commentId') commentId: string,
  ): Promise<CoreResponse> {
    await this.postValidator.validateGetPost(id);
    await this.commentValidator.validateGetComment(commentId);
    await this.commentService.delete(id);
    return { status: true };
  }
}
