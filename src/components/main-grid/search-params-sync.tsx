'use client';

import { useSearchParams } from 'next/navigation';
import React from 'react';

interface Props {
  entriesPerPage: number;
  setEntriesPerPage: (n: number) => void;
  setCurrentPage: (n: number) => void;
  setSortField: (v: 'name' | 'releaseDate') => void;
  setSortOrder: (v: 'asc' | 'desc') => void;
  setSelectedPackageId: (v: string) => void;
  selectedPackageId: string;
  didInitFromUrl: boolean;
  setDidInitFromUrl: (v: boolean) => void;
}

const MainGridSearchParamsSync: React.FC<Props> = ({
  entriesPerPage,
  setEntriesPerPage,
  setCurrentPage,
  setSortField,
  setSortOrder,
  setSelectedPackageId,
  selectedPackageId,
  didInitFromUrl,
  setDidInitFromUrl,
}) => {
  const searchParams = useSearchParams();

  // init from URL
  React.useEffect(() => {
    const sp = new URLSearchParams(searchParams?.toString());
    const pageParam = sp.get('page');
    const perPageParam = sp.get('perPage');
    const sortParam = sp.get('sort');
    const orderParam = sp.get('order');
    const selectedParam = sp.get('selected');

    const allowedPerPage = [10, 20, 50];

    if (perPageParam) {
      const per = parseInt(perPageParam);
      if (allowedPerPage.includes(per)) {
        if (per !== entriesPerPage) setEntriesPerPage(per);
      } else {
        if (entriesPerPage !== 10) setEntriesPerPage(10);
      }
    }

    if (pageParam) {
      const pageNum = Math.max(1, parseInt(pageParam));
      if (!Number.isNaN(pageNum)) setCurrentPage(pageNum);
    }

    if (sortParam === 'name' || sortParam === 'releaseDate') {
      setSortField(sortParam);
    }

    if (orderParam === 'asc' || orderParam === 'desc') {
      setSortOrder(orderParam);
    }

    if (selectedParam) {
      setSelectedPackageId(selectedParam);
    }

    setDidInitFromUrl(true);
  }, []);

  // update when search param change
  React.useEffect(() => {
    const sp = new URLSearchParams(searchParams?.toString());
    const selectedParam = sp.get('selected') || '';
    if (selectedParam !== selectedPackageId) {
      setSelectedPackageId(selectedParam);
    }
  }, [searchParams, selectedPackageId, setSelectedPackageId]);

  // write state to URL (two-way sync)
  React.useEffect(() => {
    if (!didInitFromUrl) return;
    const params = new URLSearchParams(window.location.search);
    params.set('page', String(searchParams.get('page') || 1));
    params.set('perPage', String(entriesPerPage));
    params.set('sort', searchParams.get('sort') || 'name');
    params.set('order', searchParams.get('order') || 'asc');

    if (selectedPackageId) params.set('selected', selectedPackageId);
    else params.delete('selected');

    window.history.replaceState({}, '', `?${params.toString()}`);
  }, [entriesPerPage, selectedPackageId, didInitFromUrl]);

  return null;
};

export default MainGridSearchParamsSync;
