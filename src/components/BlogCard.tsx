import React from 'react';
import { Card } from 'antd';
import { CalendarOutlined, EditOutlined } from '@ant-design/icons';
import { formatDate } from '../lib/util/date';
import { BlogPost } from '../lib/types/blog';
import { useNavigate } from 'react-router-dom';

interface BlogCardProps {
  blog: BlogPost;
}

export function BlogCard({ blog }: BlogCardProps) {
  const navigate = useNavigate();
  const { content, created_at, seo_metadata } = blog;
  
  // Get first paragraph of content for preview
  const previewText = content
    .replace(/<[^>]+>/g, '') // Remove HTML tags
    .slice(0, 200) + '...';  // Get first 200 chars

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate('/', {
      state: {
        editMode: true,
        blogData: {
          content: blog.content,
          seo_metadata: blog.seo_metadata,
          id: blog.id
        }
      }
    });
  };

  return (
    <Card
      hoverable
      onClick={() => navigate(`/blog/${blog.id}`)}
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
        <button
          onClick={handleEdit}
          className="absolute top-2 right-2 p-2 rounded-full bg-white/90 hover:bg-white shadow-sm hover:shadow transition-all z-10 group"
          aria-label="Edit blog post"
        >
          <EditOutlined className="text-gray-600 group-hover:text-indigo-600 text-lg" />
        </button>
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