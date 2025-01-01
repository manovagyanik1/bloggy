import React from 'react';
import { List, Card, Button, Modal, Typography, Space } from 'antd';
import { Link } from 'react-router-dom';
import { Project } from '../lib/types/project';
import { 
  DeleteOutlined, 
  EditOutlined, 
  ExclamationCircleOutlined,
  GlobalOutlined,
  ProjectOutlined,
  ClockCircleOutlined,
  PlusOutlined
} from '@ant-design/icons';
import { formatDate } from '../lib/util/date';

const { confirm } = Modal;
const { Title, Text } = Typography;

interface ProjectListProps {
  projects: Project[];
  onDelete: (id: string) => Promise<void>;
  isLoading?: boolean;
}

export function ProjectList({ projects, onDelete, isLoading = false }: ProjectListProps) {
  const showDeleteConfirm = (project: Project) => {
    confirm({
      title: 'Are you sure you want to delete this project?',
      icon: <ExclamationCircleOutlined />,
      content: 'This will permanently delete the project and all its blog posts. This action cannot be undone.',
      okText: 'Yes, Delete',
      okType: 'danger',
      cancelText: 'No, Cancel',
      onOk() {
        return onDelete(project.id);
      },
    });
  };

  return (
    <div className="space-y-8 py-8">
      <div className="text-center mb-12">
        <Title level={2} className="!mb-4">
          <ProjectOutlined className="mr-3" />
          Your Projects
        </Title>
        <Space>
          <Link to="/projects/new">
            <Button type="primary" icon={<PlusOutlined />}>
              Create New Project
            </Button>
          </Link>
        </Space>
      </div>
      
      <List
        grid={{ gutter: [24, 24], xs: 1, sm: 1, md: 2, lg: 3, xl: 3, xxl: 4 }}
        dataSource={projects}
        loading={isLoading}
        renderItem={(project) => (
          <List.Item>
            <Card 
              hoverable
              className="h-full flex flex-col shadow-md"
              headStyle={{ borderBottom: '2px solid #f0f0f0' }}
              title={
                <div className="flex items-center justify-between py-2">
                  <Text strong className="text-lg">
                    {project.name}
                  </Text>
                </div>
              }
              actions={[
                <Link to={`/projects/${project.id}/edit`} key="edit">
                  <EditOutlined /> Edit
                </Link>,
                <Button 
                  type="text" 
                  danger 
                  onClick={() => showDeleteConfirm(project)}
                  key="delete"
                >
                  <DeleteOutlined /> Delete
                </Button>
              ]}
            >
              <div className="flex-grow space-y-4">
                {project.description && (
                  <Text className="text-gray-600 block mb-4 line-clamp-2">
                    {project.description}
                  </Text>
                )}
                
                <div className="space-y-3">
                  <div className="flex items-center text-gray-500 hover:text-gray-700">
                    <GlobalOutlined className="mr-2 text-blue-500" />
                    <Text copyable={{ tooltips: ['Copy URL', 'URL Copied!'] }} className="text-sm">
                      {project.url}
                    </Text>
                  </div>
                  
                  <div className="flex items-center text-gray-500">
                    <ClockCircleOutlined className="mr-2 text-green-500" />
                    <Text className="text-sm">
                      Created: {formatDate(project.created_at)}
                    </Text>
                  </div>
                </div>
              </div>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
} 