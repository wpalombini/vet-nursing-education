import { AuthorDto } from './author.dto';
import { BaseDto } from './base.dto';

export class ArticleDto extends BaseDto {
  public title: string | undefined;
  public content: string | undefined;
  public author: AuthorDto | undefined;
}
