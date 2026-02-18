import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project, ProjectDocument } from './schemas/project.schema';

@Injectable()
export class ProjectsService {
  constructor(@InjectModel(Project.name) private projectModel: Model<ProjectDocument>) { }

  async create(createProjectDto: any): Promise<Project> {
    // Find max order
    const maxOrderProject = await this.projectModel.findOne().sort('-order').exec();
    const order = maxOrderProject ? maxOrderProject.order + 1 : 0;

    const createdProject = new this.projectModel({ ...createProjectDto, order });
    return createdProject.save();
  }

  async upsert(createProjectDto: any): Promise<Project> {
    const existing = await this.projectModel.findOne({ slug: createProjectDto.slug }).exec();
    if (existing) {
      const updated = await this.projectModel.findByIdAndUpdate(existing._id, createProjectDto, { new: true }).exec();
      if (!updated) throw new NotFoundException(`Project ${createProjectDto.slug} not found`);
      return updated;
    }
    return this.create(createProjectDto);
  }

  async findAll(): Promise<Project[]> {
    return this.projectModel.find().sort('order').exec();
  }

  async findOne(id: string): Promise<Project> {
    const project = await this.projectModel.findById(id).exec();
    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }
    return project;
  }

  async update(id: string, updateProjectDto: any): Promise<Project> {
    const updatedProject = await this.projectModel.findByIdAndUpdate(id, updateProjectDto, { new: true }).exec();
    if (!updatedProject) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }
    return updatedProject;
  }

  async remove(id: string): Promise<Project> {
    const deletedProject = await this.projectModel.findByIdAndDelete(id).exec();
    if (!deletedProject) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }
    return deletedProject;
  }

  async reorder(ids: string[]): Promise<void> {
    const bulkOps = ids.map((id, index) => ({
      updateOne: {
        filter: { _id: id },
        update: { order: index },
      },
    }));
    await this.projectModel.bulkWrite(bulkOps);
  }
}
