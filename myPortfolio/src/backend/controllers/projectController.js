import Project from '../models/Project.js';
import { recordTransaction } from '../utils.js';

// This function will create a new project entry in the database
export const createProject = async (req, res) => {
  const { title, description, technologies, github, image, category } = req.body;

  try {
    // Create a new Project instance with the provided data
    const project = new Project({ title, description, technologies, github, image, category });
    // Save the project entry to the database
    await project.save();

    // Record the transaction for auditing purposes
    await recordTransaction(req.user, 'create', 'project', { title, description, technologies, github, image, category });

    console.log('Project created successfully', project);
    res.status(201).json({ message: 'Project created successfully', project });
  } catch (error) {
    console.error('Error creating project', error);
    res.status(500).json({ error: error.message });
  }
};

// This function will get all projects
export const getProjects = async (req, res) => {
  try {
    // Retrieve all projects from the database
    const projects = await Project.find({});
    console.log('Projects retrieved successfully', projects);
    res.status(200).json(projects);
  } catch (error) {
    console.error('Error retrieving projects', error);
    res.status(500).json({ error: error.message });
  }
};

// This function will update a project
export const updateProject = async (req, res) => {
  const { id } = req.params;
  const { title, description, technologies, github, image, category } = req.body;

  try {
    // Find the project by ID
    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Store the old details for transaction recording
    const oldDetails = { title: project.title, description: project.description, technologies: project.technologies, github: project.github, image: project.image, category: project.category };
    // Update the project with the new data
    project.title = title || project.title;
    project.description = description || project.description;
    project.technologies = technologies || project.technologies;
    project.github = github || project.github;
    project.image = image || project.image;
    project.category = category || project.category;

    // Save the updated project to the database
    await project.save();

    // Record the transaction for auditing purposes
    await recordTransaction(req.user, 'update', 'project', { old: oldDetails, new: { title, description, technologies, github, image, category } });

    console.log('Project updated successfully', project);
    res.status(200).json({ message: 'Project updated successfully' });
  } catch (error) {
    console.error('Error updating project', error);
    res.status(500).json({ error: error.message });
  }
};

// This function will delete a project
export const deleteProject = async (req, res) => {
  const { id } = req.params;

  try {
    // Find and delete the project by ID
    const project = await Project.findByIdAndDelete(id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Record the transaction for auditing purposes
    await recordTransaction(req.user, 'delete', 'project', { title: project.title, description: project.description, technologies: project.technologies, github: project.github, image: project.image, category: project.category });

    console.log('Project deleted successfully', project);
    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Error deleting project', error);
    res.status(500).json({ error: error.message });
  }
};