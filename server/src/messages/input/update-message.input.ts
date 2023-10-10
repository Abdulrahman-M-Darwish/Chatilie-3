import { PartialType } from '@nestjs/mapped-types';
import { CreateMessageInput } from './create-message.input';

export class UpdateMessageInput extends PartialType(CreateMessageInput) {}
