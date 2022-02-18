import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from '../datasources/mongodb/models/post.model';
import { CreatePostDto } from './dto/createPost.dto';
import { UpdatePostDto } from './dto/updatePost.dto';

@Injectable()
export class PostService {
  constructor(@InjectModel(Post.name) private PostModel: Model<Post>) {}

  async getList(query: Record<string, any>): Promise<any> {
    const { limit, skip, searchText, sortObject, select } = query;
    const conditions: any = {};

    if (searchText) {
      conditions.$or = [
        { content: { $regex: searchText.trim(), $options: 'i' } },
      ];
    }

    const [posts, total] = await Promise.all([
      this.PostModel.find(conditions)
        .select(select)
        .sort(sortObject)
        .skip(skip)
        .limit(limit),
      this.PostModel.countDocuments(conditions),
    ]);

    return { posts, total };
  }

  async create(createPostDto: CreatePostDto): Promise<Post> {
    return await new this.PostModel(createPostDto).save();
  }

  async update(id: string, updatePostDto: UpdatePostDto): Promise<Post> {
    return await this.PostModel.findByIdAndUpdate(id, updatePostDto, {
      new: true,
    }).exec();
  }

  async detail(id: string): Promise<Post> {
    return await this.PostModel.findById(id);
  }

  async delete(id: string): Promise<Post> {
    return this.PostModel.findByIdAndRemove(id);
  }

  async countPost(): Promise<number> {
    return await this.PostModel.count({}).exec();
  }

  async countWithCondition(condition: Record<string, any>): Promise<number> {
    return await this.PostModel.countDocuments(condition).exec();
  }
}
