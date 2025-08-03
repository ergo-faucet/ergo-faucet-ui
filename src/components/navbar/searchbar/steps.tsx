'use client';

import { X } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';

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
    switch (filterType) {
      case 'asset':
        addFilterComponent(<Badge className='m-1 ml-2'>Asset</Badge>, 'asset');
        setIsAssetActivated(true);
        break;
      case 'creator':
        addFilterComponent(<Badge className='m-1 ml-2'>Creator</Badge>, 'creator');
        setIsCreatorActivated(true);
        break;
      case 'authMethod':
        addFilterComponent(<Badge className='m-1 ml-2'>Auth Method</Badge>, 'authMethod');
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
          Assets
        </DropdownMenuItem>
      )}
      {!isCreatorActivated && (
        <DropdownMenuItem
          onSelect={() => {
            handleFilters('creator');
          }}
        >
          Creator
        </DropdownMenuItem>
      )}
      {!isAuthActivated && (
        <DropdownMenuItem
          onSelect={() => {
            handleFilters('authMethod');
          }}
        >
          Auth Method
        </DropdownMenuItem>
      )}
    </>
  );
};

export const Step2 = () => {
  const { step, nextStep, addFilterComponent, lastFilterComponent } = useSearchbar();

  if (step !== Step.second) return null;

  switch (lastFilterComponent) {
    case 'asset':
      return (
        <>
          <DropdownMenuItem
            onSelect={() => {
              addFilterComponent(<Badge className='m-1'>=</Badge>);
              nextStep();
            }}
          >
            include
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={() => {
              addFilterComponent(<Badge className='m-1'>≠</Badge>);
              nextStep();
            }}
          >
            not include
          </DropdownMenuItem>
        </>
      );
    case 'creator':
      return (
        <>
          <DropdownMenuItem
            onSelect={() => {
              addFilterComponent(<Badge className='m-1'>=</Badge>);
              nextStep();
            }}
          >
            =
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={() => {
              addFilterComponent(<Badge className='m-1'>≠</Badge>);
              nextStep();
            }}
          >
            ≠
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={() => {
              addFilterComponent(<Badge className='m-1 block rotate-90'>≠</Badge>);
              nextStep();
            }}
          >
            <span className='block rotate-90 text-center'>≠</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={() => {
              addFilterComponent(<Badge className='m-1 block rotate-90 text-center'>=</Badge>);
              nextStep();
            }}
          >
            {/* for consistent sizes */}
            <span className='block rotate-90'>=</span>
          </DropdownMenuItem>
        </>
      );

    case 'authMethod':
      return (
        <>
          <DropdownMenuItem
            onSelect={() => {
              addFilterComponent(<Badge className='m-1'>=</Badge>);
              nextStep();
            }}
          >
            include
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={() => {
              addFilterComponent(<Badge className='m-1'>≠</Badge>);
              nextStep();
            }}
          >
            not include
          </DropdownMenuItem>
        </>
      );
  }
};

export const Step3 = () => {
  const { step, nextStep, lastFilterComponent, addFilterComponent, removeFilterComponent, filterComponents } =
    useSearchbar();
  if (step !== Step.third) return;

  const handleRemoveFilter = () => {
    for (let i = 0; i < 3; i++) removeFilterComponent(filterComponents.length - 1);
  };

  switch (lastFilterComponent) {
    case 'asset':
      return (
        <>
          <DropdownMenuItem
            onSelect={() => {
              addFilterComponent(
                <Badge onClick={handleRemoveFilter} className='m-1'>
                  BTC
                  <X />
                </Badge>,
              );
              nextStep();
            }}
          >
            BTC
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={() => {
              addFilterComponent(
                <Badge onClick={handleRemoveFilter} className='m-1'>
                  ERG
                  <X />
                </Badge>,
              );
              nextStep();
            }}
          >
            ERG
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={() => {
              addFilterComponent(
                <Badge onClick={handleRemoveFilter} className='m-1'>
                  ETH
                  <X />
                </Badge>,
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
                <Badge onClick={handleRemoveFilter} className='m-1'>
                  NAME 1<X />
                </Badge>,
              );
              nextStep();
            }}
          >
            NAME 1
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={() => {
              addFilterComponent(
                <Badge onClick={handleRemoveFilter} className='m-1'>
                  NAME 2<X />
                </Badge>,
              );
              nextStep();
            }}
          >
            NAME 2
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={() => {
              addFilterComponent(
                <Badge onClick={handleRemoveFilter} className='m-1'>
                  NAME 3<X />
                </Badge>,
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
                <Badge onClick={handleRemoveFilter} className='m-1'>
                  discord
                  <X />
                </Badge>,
              );
              nextStep();
            }}
          >
            discord
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={() => {
              addFilterComponent(
                <Badge onClick={handleRemoveFilter} className='m-1'>
                  google
                  <X />
                </Badge>,
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
