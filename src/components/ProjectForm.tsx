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
    heading: 'font-sans text-4xl font-bold text-white mb-6',
    subheading: 'font-sans text-2xl font-semibold text-white mb-4',
    body: 'font-sans text-base text-gray-300 leading-relaxed',
    caption: 'font-sans text-sm text-gray-400',
    elements: {
      h1: 'font-sans text-4xl font-bold text-white mb-6',
      h2: 'font-sans text-3xl font-semibold text-white mb-5',
      h3: 'font-sans text-2xl font-semibold text-white mb-4',
      h4: 'font-sans text-xl font-semibold text-white mb-3',
      h5: 'font-sans text-lg font-medium text-white mb-2',
      h6: 'font-sans text-base font-medium text-white mb-2',
      p: 'font-sans text-base text-gray-300 mb-4 leading-relaxed',
      ul: 'list-disc list-inside space-y-2 mb-4 text-gray-300',
      ol: 'list-decimal list-inside space-y-2 mb-4 text-gray-300',
      li: 'text-gray-300 ml-4',
      blockquote: 'border-l-4 border-blue-500 pl-4 italic text-gray-400 mb-4',
      table: 'w-full border-collapse mb-4',
      th: 'border border-gray-700 px-4 py-2 bg-gray-800 text-white font-semibold',
      td: 'border border-gray-700 px-4 py-2 text-gray-300',
      pre: 'bg-gray-800 rounded-lg p-4 mb-4 overflow-x-auto',
      code: 'font-mono text-sm bg-gray-800 rounded px-1 py-0.5 text-gray-300',
      a: 'text-blue-400 hover:text-blue-300 underline',
      img: 'max-w-full h-auto rounded-lg mb-4',
      hr: 'border-gray-700 my-8'
    }
  },
  layout: {
    container: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-gray-900',
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