import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
  ) {}

  async create(user_id: number, createPostDto: CreatePostDto): Promise<Post> {
    const data = { ...createPostDto, user: { id: user_id } };
    const post = this.postRepository.create(data);
    return await this.postRepository.save(post);
  }

  async findAll(): Promise<Post[]> {
    return await this.postRepository.find();
  }

  async findOne(id: number): Promise<Post> {
    return await this.postRepository.findOneBy({ id });
  }

  async update(id: number, updatePostDto: UpdatePostDto): Promise<Post> {
    await this.postRepository.update(id, updatePostDto);
    return this.findOne(id);
  }

  remove(id: number): Promise<DeleteResult> {
    return this.postRepository.delete(id);
  }
}
