'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MoreVertical, Edit, Trash2, Eye, ExternalLink, Power } from 'lucide-react';
import type { Partner } from '../types/partner.types';
import { togglePartnerStatus, deletePartner } from '../actions/partner.actions';
import { toast } from 'sonner';

interface PartnersDataTableProps {
  initialData: Partner[];
}

export function PartnersDataTable({ initialData }: PartnersDataTableProps) {
  const [partners, setPartners] = useState<Partner[]>(initialData);
  const [isUpdating, setIsUpdating] = useState<string | null>(null);

  const handleToggleStatus = async (id: string, currentStatus: boolean) => {
    try {
      setIsUpdating(id);
      const res = await togglePartnerStatus(id, currentStatus);
      if (res.success) {
        setPartners(prev => prev.map(p => p.id === id ? { ...p, active: res.active! } : p));
        toast.success(`Partner ${res.active ? 'activated' : 'deactivated'} successfully`);
      } else {
        toast.error(res.error || 'Failed to update status');
      }
    } catch (error) {
      toast.error('An unexpected error occurred');
    } finally {
      setIsUpdating(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this partner? This action cannot be undone.')) {
      return;
    }
    
    try {
      setIsUpdating(id);
      const res = await deletePartner(id);
      if (res.success) {
        setPartners(prev => prev.filter(p => p.id !== id));
        toast.success('Partner deleted successfully');
      } else {
        toast.error(res.error || 'Failed to delete partner');
      }
    } catch (error) {
      toast.error('An unexpected error occurred');
    } finally {
      setIsUpdating(null);
    }
  };

  if (partners.length === 0) {
    return (
      <div className="p-12 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
          <Eye className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">No partners found</h3>
        <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-6">
          Get started by creating your first partner to display on the public website.
        </p>
        <Link 
          href="/dashboard/partners/create"
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          Add Partner
        </Link>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-50/50 dark:bg-gray-950/50 border-b border-gray-200 dark:border-gray-800 text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">
            <th className="px-6 py-4 font-medium">Partner Name</th>
            <th className="px-6 py-4 font-medium">Type</th>
            <th className="px-6 py-4 font-medium">Display Order</th>
            <th className="px-6 py-4 font-medium">Status</th>
            <th className="px-6 py-4 font-medium text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
          {partners.map((partner) => (
            <tr key={partner.id} className="hover:bg-gray-50/30 dark:hover:bg-gray-800/30 transition-colors group">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded bg-gray-100 dark:bg-gray-800 flex items-center justify-center overflow-hidden border border-gray-200 dark:border-gray-700">
                    <span className="text-xs font-semibold text-gray-500">Logo</span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white flex items-center gap-2">
                      {partner.name}
                      {partner.featured && (
                        <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 text-[10px] font-bold uppercase tracking-wider">
                          Featured
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-gray-500 flex items-center gap-1 mt-0.5">
                      {partner.websiteUrl ? (
                        <a href={partner.websiteUrl} target="_blank" rel="noreferrer" className="hover:text-blue-600 flex items-center gap-1">
                          {partner.websiteUrl.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                          <ExternalLink size={12} />
                        </a>
                      ) : (
                        'No website'
                      )}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                {partner.partnerType}
              </td>
              <td className="px-6 py-4 text-sm font-mono text-gray-600 dark:text-gray-400">
                {partner.displayOrder}
              </td>
              <td className="px-6 py-4">
                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${
                  partner.active 
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-900/50' 
                    : 'bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700'
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${partner.active ? 'bg-emerald-500' : 'bg-gray-400'}`} />
                  {partner.active ? 'Active' : 'Inactive'}
                </span>
              </td>
              <td className="px-6 py-4 text-right">
                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => handleToggleStatus(partner.id, partner.active)}
                    disabled={isUpdating === partner.id}
                    className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors disabled:opacity-50"
                    title={partner.active ? 'Deactivate' : 'Activate'}
                  >
                    <Power size={18} />
                  </button>
                  <Link 
                    href={`/dashboard/partners/${partner.id}/edit`}
                    className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                  >
                    <Edit size={18} />
                  </Link>
                  <button 
                    onClick={() => handleDelete(partner.id)}
                    disabled={isUpdating === partner.id}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors disabled:opacity-50"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
