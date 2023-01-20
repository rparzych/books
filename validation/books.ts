const { IsString, Min, validateOrReject } = require("class-validator");
// import { Book } from "../_intefaces/books";

class AddBookValidation {
    @IsString()
    author!: string | null;

    @IsString()
    country: string | null;

    @IsString()
    imageLink: string | null;

    @IsString()
    language: string | null;

    @IsString()
    link: string | null;

    @IsString()
    pages: number | null;

    @IsString()
    title!: string | null;

    @Min(0)
    year!: number | null;
}

async function validateBook(details) {
  let addBookValidation = new AddBookValidation();
  addBookValidation.author = details?.author || null;
  addBookValidation.country = details?.country || null;
  addBookValidation.imageLink = details?.imageLink || null;
  addBookValidation.language = details?.language || null;
  addBookValidation.link = details?.link || null;
  addBookValidation.pages = details?.pages || null;
  addBookValidation.title = details?.title || null;
  addBookValidation.year = details?.year || null;
  try {
    await validateOrReject(addBookValidation);
    return { errors: {} };
  } catch (err) {
    console.warn("[Add Book Validations] error");
      const errorsList: Record<string, string> = err.reduce(
        (prevError, currError) => {
          const property = currError.property;
          const message = Object.values(currError.constraints!)[0];
          return {...prevError, [property]: message };
        },{}
      );
    return { errors: errorsList };
  }
}

module.exports = {
  validateBook,
}
