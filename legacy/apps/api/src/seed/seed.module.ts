import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { ProjectsModule } from '../projects/projects.module';
import { SkillsModule } from '../skills/skills.module';
import { ExperienceModule } from '../experience/experience.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [ProjectsModule, SkillsModule, ExperienceModule, UsersModule],
  controllers: [SeedController],
  providers: [SeedService],
})
export class SeedModule { }
