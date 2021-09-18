import { AuthorDto } from './author.dto';

export class ArticleDto {
  public id: string | undefined;
  public title: string | undefined;
  public author: AuthorDto | undefined;
}
