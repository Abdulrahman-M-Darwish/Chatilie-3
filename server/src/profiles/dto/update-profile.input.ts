import { UpdateProfileInput as IUpdateProfileInput } from 'src/graphql';

export class UpdateProfileInput implements IUpdateProfileInput {
  bio?: string;
  country?: string;
  cover?: string;
  hobbies?: string[];
}
