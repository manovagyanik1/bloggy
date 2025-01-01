import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getUserProfile, updateUserProfile } from '../lib/services/userProfile';
import { UserProfile, UpdateUserProfileInput } from '../lib/types/user';
import { toast } from 'react-hot-toast';

export function ProfilePage() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (user) {
      loadProfile();
    }
  }, [user]);

  const loadProfile = async () => {
    try {
      const data = await getUserProfile(user!.id);
      setProfile(data);
    } catch (error) {
      console.error('Error loading profile:', error);
      toast.error('Failed to load profile');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;

    setIsUpdating(true);
    try {
      const formData = new FormData(e.currentTarget);
      const updates: UpdateUserProfileInput = {
        bio: formData.get('bio') as string,
        website: formData.get('website') as string,
        company: formData.get('company') as string,
        location: formData.get('location') as string,
      };

      const updatedProfile = await updateUserProfile(user.id, updates);
      setProfile(updatedProfile);
      toast.success('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white">Loading profile...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center gap-x-4">
          <img
            src={profile?.avatar_url || '/default-avatar.png'}
            alt="Profile"
            className="h-16 w-16 rounded-full"
          />
          <div>
            <h1 className="text-3xl font-bold text-white">
              {profile?.full_name}
            </h1>
            <p className="text-gray-400">{profile?.email}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300">
              Bio
            </label>
            <textarea
              name="bio"
              rows={3}
              defaultValue={profile?.bio || ''}
              placeholder="Tell us about yourself"
              className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white placeholder-gray-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300">
              Website
            </label>
            <input
              type="url"
              name="website"
              defaultValue={profile?.website || ''}
              placeholder="https://your-website.com"
              className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white placeholder-gray-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300">
              Company
            </label>
            <input
              type="text"
              name="company"
              defaultValue={profile?.company || ''}
              placeholder="Where do you work?"
              className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white placeholder-gray-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300">
              Location
            </label>
            <input
              type="text"
              name="location"
              defaultValue={profile?.location || ''}
              placeholder="Where are you based?"
              className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white placeholder-gray-500"
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={isUpdating}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {isUpdating ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 