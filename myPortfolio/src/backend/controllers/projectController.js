import Project from '../models/Project.js';
import { verifyPassword, recordTransaction } from '../utils.js';

// This function eill create a new project entry in the database
export const createProject = async (req, res) => {
  const { title, description, technologies, github, image, category } = req.body;

  try {
    if (req.user.role !== 'admin') {
      return res.status(401).json({ message: 'Access denied. Only admins can create new projects.' });
    }

    const project = new Project({ title, description, technologies, github, image, category });
    await project.save();

    await recordTransaction(req.user, 'create', 'project', {title, description, technologies, github, image, category });

    console.log('Project created successfully', project);
    res.status(201).json({ message: 'Project created successfully', project });
  } catch (error) {
    console.error('Error creating project', error);
    res.status(500).json({ error: error.message });
  }
};

// This funciton will get all projects
export const getProjects = async (req, res) => {
  try {
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
  const { title, description, technologies, link, image, category, password } = req.body;

  try {
    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    await verifyPassword(password, req.user.password);

    const oldDetails = { title: project.title, description: project.description, technologies: project.technologies, link: project.link, image: project.image, category: project.category };
    project.title = title || project.title;
    project.description = description || project.description;
    project.technologies = technologies || project.technologies;
    project.link = link || project.link;
    project.image = image || project.image;
    project.category = category || project.category;

    await project.save();

    await recordTransaction(req.user, 'update', 'project', { old: oldDetails, new: { title, description, technologies, link, image, category } });

    console.log('Project updated successfully', project);
    res.status(200).json({ message: 'Project updated successfully' });
  } catch (error) {
    console.error('Error updating project', error);
    res.status500().json({ error: error.message });
  }
};

// This function will delete a project
export const deleteProject = async (req, res) => {
  const { id } = req.params;

  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Only admins can delete projects.' });
    }

    const project = await Project.findByIdAndDelete(id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    await recordTransaction(req.user, 'delete', 'project', { title: project.title, description: project.description, technologies: project.technologies, link: project.link, image: project.image, category: project.category });

    console.log('Project deleted successfully', project);
    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Error deleting project', error);
    res.status(500).json({ error: error.message });
  }
};