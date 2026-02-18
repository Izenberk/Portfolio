import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SkillCategory, SkillCategoryDocument } from './schemas/skill.schema';

@Injectable()
export class SkillsService {
  constructor(@InjectModel(SkillCategory.name) private skillModel: Model<SkillCategoryDocument>) { }

  async create(createSkillDto: any): Promise<SkillCategory> {
    const createdSkill = new this.skillModel(createSkillDto);
    return createdSkill.save();
  }

  async upsert(createSkillDto: any): Promise<SkillCategory> {
    const existing = await this.skillModel.findOne({ title: createSkillDto.title }).exec();
    if (existing) {
      const updated = await this.skillModel.findByIdAndUpdate(existing._id, createSkillDto, { new: true }).exec();
      if (!updated) throw new NotFoundException(`Skill ${createSkillDto.title} not found`);
      return updated;
    }
    return this.create(createSkillDto);
  }

  async findAll(): Promise<SkillCategory[]> {
    return this.skillModel.find().sort({ order: 1 }).exec();
  }

  async reorder(items: { id: string, order: number }[]): Promise<void> {
    const bulkOps = items.map((item) => ({
      updateOne: {
        filter: { _id: item.id },
        update: { $set: { order: item.order } },
      },
    }));
    await this.skillModel.bulkWrite(bulkOps);
  }

  async findOne(id: string): Promise<SkillCategory> {
    const skill = await this.skillModel.findById(id).exec();
    if (!skill) {
      throw new NotFoundException(`Skill with ID ${id} not found`);
    }
    return skill;
  }

  async update(id: string, updateSkillDto: any): Promise<SkillCategory> {
    const updatedSkill = await this.skillModel.findByIdAndUpdate(id, updateSkillDto, { new: true }).exec();
    if (!updatedSkill) {
      throw new NotFoundException(`Skill with ID ${id} not found`);
    }
    return updatedSkill;
  }

  async remove(id: string): Promise<SkillCategory> {
    const deletedSkill = await this.skillModel.findByIdAndDelete(id).exec();
    if (!deletedSkill) {
      throw new NotFoundException(`Skill with ID ${id} not found`);
    }
    return deletedSkill;
  }
}
