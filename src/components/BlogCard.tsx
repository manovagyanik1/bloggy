import React from 'react';
import { Card } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';
import { formatDate } from '../lib/util/date';
import { BlogPost } from '../lib/types/blog';
import { useNavigate } from 'react-router-dom';

interface BlogCardProps {
  blog: BlogPost;
}

export function BlogCard({ blog }: BlogCardProps) {
  const navigate = useNavigate();
  const { content, created_at } = blog;
  
  // Get first paragraph of content for preview
  const previewText = content
    .replace(/<[^>]+>/g, '') // Remove HTML tags
    .slice(0, 200) + '...';  // Get first 200 chars

  return (
    <Card
      hoverable
      onClick={() => navigate(`/blog/${blog.id}`)}
      className="h-full"
      cover={
        <div className="h-48 bg-gray-100 flex items-center justify-center">
          <img
            alt={blog.seo_metadata.seo_title}  
            src="https://via.placeholder.com/400x200"
            className="object-cover h-full w-full"
          />
        </div>
      }
    >
      <Card.Meta
        title={blog.seo_metadata.seo_title}
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