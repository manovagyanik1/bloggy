import React from 'react';
import { Form, Input, Button } from 'antd';
import { CreateProjectInput } from '../lib/types/project';
import { BlogTheme } from '../lib/types/theme';

const defaultTheme: BlogTheme = {
  name: "clipy",
  colors: {
    primary: '#3b82f6',    // blue-500
    secondary: '#60a5fa',   // blue-400
    background: '#111827',  // gray-900
    text: '#ffffff',
  },
  fonts: {
    heading: 'font-sans text-4xl font-bold text-white',
    subheading: 'font-sans text-2xl font-semibold text-white',
    body: 'font-sans text-base text-gray-300',
    caption: 'font-sans text-sm text-gray-400',
  },
  layout: {
    container: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
    sectionSpacing: 'py-24',
    imageSpacing: 'my-6',
  }
};

interface ProjectFormProps {
  onSubmit: (values: CreateProjectInput) => void;
  initialValues?: Partial<CreateProjectInput>;
  isLoading?: boolean;
}

export function ProjectForm({ onSubmit, initialValues, isLoading = false }: ProjectFormProps) {
  const [form] = Form.useForm();

  const validateThemeJson = (_: any, value: string) => {
    try {
      const theme = JSON.parse(value);
      const requiredKeys = ['name', 'colors', 'fonts', 'layout'];
      const requiredColors = ['primary', 'secondary', 'background', 'text'];
      const requiredFonts = ['heading', 'subheading', 'body', 'caption'];
      const requiredLayout = ['container', 'sectionSpacing', 'imageSpacing'];

      if (!requiredKeys.every(key => key in theme)) {
        return Promise.reject('Theme must include: name, colors, fonts, and layout');
      }
      if (!requiredColors.every(key => key in theme.colors)) {
        return Promise.reject('Colors must include: primary, secondary, background, and text');
      }
      if (!requiredFonts.every(key => key in theme.fonts)) {
        return Promise.reject('Fonts must include: heading, subheading, body, and caption');
      }
      if (!requiredLayout.every(key => key in theme.layout)) {
        return Promise.reject('Layout must include: container, sectionSpacing, and imageSpacing');
      }

      return Promise.resolve();
    } catch (e) {
      return Promise.reject('Invalid JSON format');
    }
  };

  const handleSubmit = (values: any) => {
    const projectData = {
      ...values,
      theme: JSON.parse(values.theme)
    };
    onSubmit(projectData);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      initialValues={{
        ...initialValues,
        theme: initialValues?.theme ? JSON.stringify(initialValues.theme, null, 2) : JSON.stringify(defaultTheme, null, 2)
      }}
      className="max-w-2xl mx-auto"
    >
      <Form.Item
        label="Project Name"
        name="name"
        rules={[
          { required: true, message: 'Please enter a project name' },
          { min: 3, message: 'Name must be at least 3 characters' }
        ]}
      >
        <Input placeholder="My Awesome Project" />
      </Form.Item>

      <Form.Item
        label="URL Slug"
        name="slug"
        rules={[
          { required: true, message: 'Please enter a URL slug' },
          { pattern: /^[a-z0-9-]+$/, message: 'Slug can only contain lowercase letters, numbers, and hyphens' }
        ]}
        help="This will be used in your project's URL (e.g., myproject)"
      >
        <Input placeholder="my-project" />
      </Form.Item>

      <Form.Item
        label="Project URL"
        name="url"
        rules={[
          { required: true, message: 'Please enter your project URL' },
          { type: 'url', message: 'Please enter a valid URL' }
        ]}
        help="The full URL where your blog will be hosted (e.g., https://myblog.com/blog)"
      >
        <Input placeholder="https://myblog.com/blog" />
      </Form.Item>

      <Form.Item
        label="Description"
        name="description"
        rules={[
          { max: 500, message: 'Description cannot be longer than 500 characters' }
        ]}
      >
        <Input.TextArea 
          placeholder="Describe your project..."
          rows={4}
        />
      </Form.Item>

      <Form.Item
        label="Theme Configuration"
        name="theme"
        rules={[
          { required: true, message: 'Please enter theme configuration' },
          { validator: validateThemeJson }
        ]}
        help="Enter your theme configuration in JSON format"
      >
        <Input.TextArea 
          rows={10}
          placeholder={JSON.stringify(defaultTheme, null, 2)}
        />
      </Form.Item>

      <Form.Item>
        <Button 
          type="primary" 
          htmlType="submit"
          loading={isLoading}
          className="w-full"
        >
          {initialValues ? 'Update Project' : 'Create Project'}
        </Button>
      </Form.Item>
    </Form>
  );
} 