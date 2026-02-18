import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Experience, ExperienceDocument } from './schemas/experience.schema';

@Injectable()
export class ExperienceService {
  constructor(@InjectModel(Experience.name) private experienceModel: Model<ExperienceDocument>) { }

  async create(createExperienceDto: any): Promise<Experience> {
    const createdExperience = new this.experienceModel(createExperienceDto);
    return createdExperience.save();
  }

  async upsert(createExperienceDto: any): Promise<Experience> {
    const existing = await this.experienceModel.findOne({ id: createExperienceDto.id }).exec();
    if (existing) {
      const updated = await this.experienceModel.findByIdAndUpdate(existing._id, createExperienceDto, { new: true }).exec();
      if (!updated) throw new NotFoundException(`Experience ${createExperienceDto.id} not found`);
      return updated;
    }
    return this.create(createExperienceDto);
  }

  async findAll(): Promise<Experience[]> {
    return this.experienceModel.find().sort({ order: 1 }).exec();
  }

  async reorder(items: { id: string, order: number }[]): Promise<void> {
    const bulkOps = items.map((item) => ({
      updateOne: {
        filter: { _id: item.id },
        update: { $set: { order: item.order } },
      },
    }));
    await this.experienceModel.bulkWrite(bulkOps);
  }

  async findOne(id: string): Promise<Experience> {
    const experience = await this.experienceModel.findById(id).exec();
    if (!experience) {
      throw new NotFoundException(`Experience with ID ${id} not found`);
    }
    return experience;
  }

  async update(id: string, updateExperienceDto: any): Promise<Experience> {
    const updatedExperience = await this.experienceModel.findByIdAndUpdate(id, updateExperienceDto, { new: true }).exec();
    if (!updatedExperience) {
      throw new NotFoundException(`Experience with ID ${id} not found`);
    }
    return updatedExperience;
  }

  async remove(id: string): Promise<Experience> {
    const deletedExperience = await this.experienceModel.findByIdAndDelete(id).exec();
    if (!deletedExperience) {
      throw new NotFoundException(`Experience with ID ${id} not found`);
    }
    return deletedExperience;
  }
}
