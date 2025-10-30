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
  currentPage: number;
  sortField: 'name' | 'releaseDate';
  sortOrder: 'asc' | 'desc';
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
  currentPage,
  sortField,
  sortOrder,
  didInitFromUrl,
  setDidInitFromUrl,
}) => {
  const searchParams = useSearchParams();

  // initialize from url
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
      if (allowedPerPage.includes(per)) setEntriesPerPage(per);
    }

    if (pageParam) {
      const num = parseInt(pageParam);
      if (!Number.isNaN(num) && num >= 1) setCurrentPage(num);
    }

    if (sortParam === 'name' || sortParam === 'releaseDate') setSortField(sortParam);
    if (orderParam === 'asc' || orderParam === 'desc') setSortOrder(orderParam);
    if (selectedParam) setSelectedPackageId(selectedParam);

    setDidInitFromUrl(true);
  }, []);

  // update when search params change (keep selected, sort, order in sync)
  React.useEffect(() => {
    const sp = new URLSearchParams(searchParams?.toString());

    const selectedParam = sp.get('selected') || '';
    if (selectedParam !== selectedPackageId) setSelectedPackageId(selectedParam);

    const sortParam = sp.get('sort');
    if ((sortParam === 'name' || sortParam === 'releaseDate') && sortParam !== sortField) {
      setSortField(sortParam);
    }

    const orderParam = sp.get('order');
    if ((orderParam === 'asc' || orderParam === 'desc') && orderParam !== sortOrder) {
      setSortOrder(orderParam);
    }
  }, [searchParams]);

  // write state to url
  React.useEffect(() => {
    if (!didInitFromUrl) return;

    const sp = new URLSearchParams(window.location.search);
    sp.set('page', String(currentPage));
    sp.set('perPage', String(entriesPerPage));
    sp.set('sort', sortField);
    sp.set('order', sortOrder);

    if (selectedPackageId) sp.set('selected', selectedPackageId);
    else sp.delete('selected');

    const newUrl = `?${sp.toString()}`;
    const currentUrl = window.location.search;
    if (newUrl !== currentUrl) {
      window.history.replaceState({}, '', newUrl);
    }
  }, [didInitFromUrl, currentPage, entriesPerPage, sortField, sortOrder, selectedPackageId]);

  return null;
};

export default MainGridSearchParamsSync;
