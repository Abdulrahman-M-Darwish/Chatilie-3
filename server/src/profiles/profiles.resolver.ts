import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ProfilesService } from './profiles.service';
import { UpdateProfileInput } from './dto/update-profile.input';

@Resolver('Profile')
export class ProfilesResolver {
  constructor(private readonly profilesService: ProfilesService) {}

  @Query('profile')
  findOne(@Args('id') id: string) {
    return this.profilesService.findOne(id);
  }
  @Mutation('createProfile')
  create(@Args('id') id: string) {
    return this.profilesService.create(id);
  }
  @Mutation('updateProfile')
  update(
    @Args('id') id: string,
    @Args('updateProfileInput') updateProfileInput,
  ) {
    return this.profilesService.update(id, updateProfileInput);
  }
  @Mutation('removeProfile')
  remove(@Args('id') id: string) {
    return this.profilesService.remove(id);
  }
}
