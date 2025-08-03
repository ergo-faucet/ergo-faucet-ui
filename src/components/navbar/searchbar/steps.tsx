'use client';

import { Coins, KeyRound, SquaresExclude, SquaresIntersect, UserRoundPlus, X } from 'lucide-react';
import { nanoid } from 'nanoid';

import { DropdownMenuItem } from '@/components/ui/dropdown-menu';

import SearchbarBadge from './searchbar-badge';
import { SearchbarFilterType } from './types';
import { Step, useSearchbar } from './useStore';

export const Step1 = () => {
  const {
    isAuthActivated,
    isAssetActivated,
    isCreatorActivated,
    step,
    setIsAuthActivated,
    setIsAssetActivated,
    setIsCreatorActivated,
    nextStep,
    addFilterComponent,
  } = useSearchbar();

  if (step !== Step.first) return null;

  const handleFilters = (filterType: SearchbarFilterType) => {
    const id = nanoid();
    switch (filterType) {
      case 'asset':
        addFilterComponent(id, <SearchbarBadge className='m-1 ml-2'>Asset</SearchbarBadge>, 'asset');
        setIsAssetActivated(true);
        break;
      case 'creator':
        addFilterComponent(id, <SearchbarBadge className='m-1 ml-2'>Creator</SearchbarBadge>, 'creator');
        setIsCreatorActivated(true);
        break;
      case 'authMethod':
        addFilterComponent(id, <SearchbarBadge className='m-1 ml-2'>Auth Method</SearchbarBadge>, 'authMethod');
        setIsAuthActivated(true);
        break;
    }

    nextStep();
  };

  return (
    <>
      {' '}
      {!isAssetActivated && (
        <DropdownMenuItem
          onSelect={() => {
            handleFilters('asset');
          }}
        >
          <Coins /> Assets
        </DropdownMenuItem>
      )}
      {!isCreatorActivated && (
        <DropdownMenuItem
          onSelect={() => {
            handleFilters('creator');
          }}
        >
          <UserRoundPlus /> Creator
        </DropdownMenuItem>
      )}
      {!isAuthActivated && (
        <DropdownMenuItem
          onSelect={() => {
            handleFilters('authMethod');
          }}
        >
          <KeyRound /> Auth Method
        </DropdownMenuItem>
      )}
    </>
  );
};

export const Step2 = () => {
  const { step, nextStep, addFilterComponent, lastFilterComponent } = useSearchbar();

  if (step !== Step.second) return null;

  const id = nanoid();

  switch (lastFilterComponent) {
    case 'asset':
      return (
        <>
          <DropdownMenuItem
            onSelect={() => {
              addFilterComponent(id, <SearchbarBadge className='m-1'>=</SearchbarBadge>);
              nextStep();
            }}
          >
            <SquaresIntersect /> include
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={() => {
              addFilterComponent(id, <SearchbarBadge className='m-1'>≠</SearchbarBadge>);
              nextStep();
            }}
          >
            <SquaresExclude /> not include
          </DropdownMenuItem>
        </>
      );
    case 'creator':
      return (
        <>
          <DropdownMenuItem
            onSelect={() => {
              addFilterComponent(id, <SearchbarBadge className='m-1'>=</SearchbarBadge>);
              nextStep();
            }}
          >
            = is
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={() => {
              addFilterComponent(id, <SearchbarBadge className='m-1'>≠</SearchbarBadge>);
              nextStep();
            }}
          >
            ≠ is not
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={() => {
              addFilterComponent(id, <SearchbarBadge className='m-1 block rotate-90 text-center'>=</SearchbarBadge>);
              nextStep();
            }}
          >
            {/* for consistent sizes */}
            <span className='block rotate-90'>=</span>
            <span>is one of</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={() => {
              addFilterComponent(id, <SearchbarBadge className='m-1 block rotate-90'>≠</SearchbarBadge>);
              nextStep();
            }}
          >
            <span className='block rotate-90 text-center'>≠</span>
            <span>is not one of</span>
          </DropdownMenuItem>
        </>
      );

    case 'authMethod':
      return (
        <>
          <DropdownMenuItem
            onSelect={() => {
              addFilterComponent(id, <SearchbarBadge className='m-1'>=</SearchbarBadge>);
              nextStep();
            }}
          >
            <SquaresIntersect /> include
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={() => {
              addFilterComponent(id, <SearchbarBadge className='m-1'>≠</SearchbarBadge>);
              nextStep();
            }}
          >
            <SquaresExclude /> not include
          </DropdownMenuItem>
        </>
      );
  }
};

export const Step3 = () => {
  const { step, nextStep, lastFilterComponent, addFilterComponent, removeFilterComponent } = useSearchbar();
  if (step !== Step.third) return;

  const id = nanoid();

  const handleRemoveFilter = (id: string) => {
    removeFilterComponent(id);
  };

  switch (lastFilterComponent) {
    case 'asset':
      return (
        <>
          <DropdownMenuItem
            onSelect={() => {
              addFilterComponent(
                id,
                <SearchbarBadge onClick={() => handleRemoveFilter(id)} className='m-1'>
                  BTC
                  <X />
                </SearchbarBadge>,
              );
              nextStep();
            }}
          >
            BTC
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={() => {
              addFilterComponent(
                id,
                <SearchbarBadge onClick={() => handleRemoveFilter(id)} className='m-1'>
                  ERG
                  <X />
                </SearchbarBadge>,
              );
              nextStep();
            }}
          >
            ERG
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={() => {
              const id = nanoid();
              addFilterComponent(
                id,
                <SearchbarBadge onClick={() => handleRemoveFilter(id)} className='m-1'>
                  ETH
                  <X />
                </SearchbarBadge>,
              );
              nextStep();
            }}
          >
            ETH
          </DropdownMenuItem>
        </>
      );
    case 'creator':
      return (
        <>
          <DropdownMenuItem
            onSelect={() => {
              addFilterComponent(
                id,
                <SearchbarBadge onClick={() => handleRemoveFilter(id)} className='m-1'>
                  NAME 1<X />
                </SearchbarBadge>,
              );
              nextStep();
            }}
          >
            NAME 1
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={() => {
              addFilterComponent(
                id,
                <SearchbarBadge onClick={() => handleRemoveFilter(id)} className='m-1'>
                  NAME 2<X />
                </SearchbarBadge>,
              );
              nextStep();
            }}
          >
            NAME 2
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={() => {
              addFilterComponent(
                id,
                <SearchbarBadge onClick={() => handleRemoveFilter(id)} className='m-1'>
                  NAME 3<X />
                </SearchbarBadge>,
              );
              nextStep();
            }}
          >
            NAME 3
          </DropdownMenuItem>
        </>
      );
    case 'authMethod':
      return (
        <>
          <DropdownMenuItem
            onSelect={() => {
              addFilterComponent(
                id,
                <SearchbarBadge onClick={() => handleRemoveFilter(id)} className='m-1'>
                  discord
                  <X />
                </SearchbarBadge>,
              );
              nextStep();
            }}
          >
            discord
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={() => {
              addFilterComponent(
                id,
                <SearchbarBadge onClick={() => handleRemoveFilter(id)} className='m-1'>
                  google
                  <X />
                </SearchbarBadge>,
              );
              nextStep();
            }}
          >
            google
          </DropdownMenuItem>
        </>
      );
  }
};
