import React, { useState } from 'react';
import { Form, Input, Button, Select } from 'antd';
import { CreateProjectInput } from '../lib/types/project';
import { darkTheme } from '../lib/themes/darkTheme';
import { lightTheme } from '../lib/themes/lightTheme';

const { Option } = Select;

interface ProjectFormProps {
  onSubmit: (values: CreateProjectInput) => void;
  initialValues?: Partial<CreateProjectInput>;
  isLoading?: boolean;
}

export function ProjectForm({ onSubmit, initialValues, isLoading = false }: ProjectFormProps) {
  const [form] = Form.useForm();
  const [selectedTheme, setSelectedTheme] = useState('dark');

  const validateThemeJson = (_: any, value: string) => {
    try {
      const theme = JSON.parse(value);
      const requiredKeys = ['name', 'colors', 'fonts', 'layout'];
      const requiredColors = ['primary', 'secondary', 'background', 'text'];
      const requiredFonts = ['heading', 'subheading', 'body', 'caption', 'elements'];
      const requiredElements = [
        'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'ul', 'ol', 'li',
        'blockquote', 'table', 'th', 'td', 'pre', 'code', 'a', 'img', 'hr'
      ];
      const requiredLayout = ['container', 'sectionSpacing', 'imageSpacing'];

      if (!requiredKeys.every(key => key in theme)) {
        return Promise.reject('Theme must include: name, colors, fonts, and layout');
      }
      if (!requiredColors.every(key => key in theme.colors)) {
        return Promise.reject('Colors must include: primary, secondary, background, and text');
      }
      if (!requiredFonts.every(key => key in theme.fonts)) {
        return Promise.reject('Fonts must include: heading, subheading, body, caption, and elements');
      }
      if (!requiredElements.every(key => key in theme.fonts.elements)) {
        return Promise.reject('Font elements must include all HTML element styles');
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

  const handleThemeChange = (value: string) => {
    setSelectedTheme(value);
    if (value === 'dark') {
      form.setFieldsValue({ theme: JSON.stringify(darkTheme, null, 2) });
    } else if (value === 'light') {
      form.setFieldsValue({ theme: JSON.stringify(lightTheme, null, 2) });
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      initialValues={{
        ...initialValues,
        theme: initialValues?.theme ? JSON.stringify(initialValues.theme, null, 2) : JSON.stringify(darkTheme, null, 2)
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
        help="This description will be used to train the AI about your website's context. Be specific about your website's purpose, features, and target audience."
      >
        <Input.TextArea 
          placeholder="Describe your project in detail. For example: 'My website is a professional photography portfolio showcasing landscape and portrait photography. It features galleries organized by theme, client testimonials, booking system for photo sessions, and a blog section sharing photography tips and behind-the-scenes content. The target audience includes potential clients, art directors, and photography enthusiasts.'"
          rows={4}
        />
      </Form.Item>

      <div className="mb-4">
        <label className="block mb-2">Theme Type</label>
        <Select 
          value={selectedTheme}
          onChange={handleThemeChange}
          className="w-full"
        >
          <Option value="dark">Dark Theme</Option>
          <Option value="light">Light Theme</Option>
          <Option value="custom">Custom Theme</Option>
        </Select>
      </div>

      <Form.Item
        label="Theme Configuration"
        name="theme"
        rules={[
          { required: true, message: 'Please enter theme configuration' },
          { validator: validateThemeJson }
        ]}
        help="Customize the theme configuration in JSON format"
      >
        <Input.TextArea 
          rows={10}
          placeholder={JSON.stringify(darkTheme, null, 2)}
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