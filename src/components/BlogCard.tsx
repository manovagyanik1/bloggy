import React, { useState } from 'react';
import { Card } from 'antd';
import { CalendarOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { formatDate } from '../lib/util/date';
import { BlogPost } from '../lib/types/blog';
import { useNavigate, useParams } from 'react-router-dom';
import { Modal, message } from 'antd';
import { deleteBlogPost } from '../lib/services/blog';

const { confirm } = Modal;

interface BlogCardProps {
  blog: BlogPost;
  onDelete?: (blogId: string) => void;
}

export function BlogCard({ blog, onDelete }: BlogCardProps) {
  const navigate = useNavigate();
  const { content, created_at, seo_metadata } = blog;
  const { projectSlug } = useParams();
  const [isDeleting, setIsDeleting] = useState(false);

  // Get first paragraph of content for preview
  const previewText = content
    .replace(/<[^>]+>/g, '') // Remove HTML tags
    .slice(0, 200) + '...';  // Get first 200 chars

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/projects/${projectSlug}/blogs/${blog.id}/edit`);
  };

  const showDeleteConfirm = (e: React.MouseEvent) => {
    e.stopPropagation();
    confirm({
      title: 'Are you sure you want to delete this blog post?',
      content: 'This action cannot be undone.',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: async () => {
        try {
          setIsDeleting(true);
          await deleteBlogPost(blog.id);
          message.success('Blog post deleted successfully');
          onDelete?.(blog.id);
        } catch (error) {
          console.error('Error deleting blog post:', error);
          message.error('Failed to delete blog post');
        } finally {
          setIsDeleting(false);
        }
      },
    });
  };

  return (
    <Card 
      hoverable
      onClick={() => navigate(`/projects/${projectSlug}/blogs/${blog.id}`)}
      className="h-full relative"
      cover={
        <div className="h-48 bg-gray-100 flex items-center justify-center">
          <img
            alt={seo_metadata.seo_title}
            src="https://via.placeholder.com/400x200"
            className="object-cover h-full w-full"
          />
        </div>
      }
      extra={
        <div className="absolute top-2 right-2 flex gap-2">
          <button
            onClick={handleEdit}
            className="p-2 rounded-full bg-white/90 hover:bg-white shadow-sm hover:shadow transition-all z-10 group"
            aria-label="Edit blog post"
          >
            <EditOutlined className="text-gray-600 group-hover:text-indigo-600 text-lg" />
          </button>
          <button
            onClick={showDeleteConfirm}
            disabled={isDeleting}
            className="p-2 rounded-full bg-white/90 hover:bg-white shadow-sm hover:shadow transition-all z-10 group"
            aria-label="Delete blog post"
          >
            <DeleteOutlined className="text-gray-600 group-hover:text-red-600 text-lg" />
          </button>
        </div>
      }
    >
      <Card.Meta
        title={seo_metadata.seo_title}
        description={
          <div className="space-y-2">
            <p className="text-gray-600 line-clamp-3">{previewText}</p>
            <div className="flex items-center text-gray-400 text-sm">
              <CalendarOutlined className="mr-1" />
              {formatDate(created_at)}
            </div>
          </div>
        }
      />
    </Card>
  );
} 