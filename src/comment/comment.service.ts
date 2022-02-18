import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment } from '../datasources/mongodb/models/comment.model';
import { CreateCommentDto } from './dto/createComment.dto';
import { UpdateCommentDto } from './dto/updateComment.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment.name) private CommentModel: Model<Comment>,
  ) {}

  async getList(query: Record<string, any>): Promise<any> {
    const { limit, skip, sortObject, post, select } = query;
    const conditions: any = {};
    if (post) conditions.post = post;
    const [comments, total] = await Promise.all([
      this.CommentModel.find(conditions)
        .select(select)
        .sort(sortObject)
        .skip(skip)
        .limit(limit),
      this.CommentModel.countDocuments(conditions),
    ]);

    return { comments, total };
  }

  async create(createCommentDto: CreateCommentDto): Promise<Comment> {
    return await new this.CommentModel(createCommentDto).save();
  }

  async detail(id: string): Promise<Comment> {
    return await this.CommentModel.findById(id);
  }

  async update(id: string, updatePostDto: UpdateCommentDto): Promise<Comment> {
    return await this.CommentModel.findByIdAndUpdate(id, updatePostDto, {
      new: true,
    }).exec();
  }

  async delete(id: string): Promise<Comment> {
    return this.CommentModel.findByIdAndRemove(id);
  }

  async countComment(): Promise<number> {
    return await this.CommentModel.count({}).exec();
  }

  async countWithCondition(condition: Record<string, any>): Promise<number> {
    return await this.CommentModel.countDocuments(condition).exec();
  }
}
