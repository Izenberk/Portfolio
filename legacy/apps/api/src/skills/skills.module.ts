import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SkillsService } from './skills.service';
import { SkillsController } from './skills.controller';
import { SkillCategory, SkillCategorySchema } from './schemas/skill.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: SkillCategory.name, schema: SkillCategorySchema }])],
  controllers: [SkillsController],
  providers: [SkillsService],
  exports: [SkillsService],
})
export class SkillsModule { }
