
import React from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent } from '@/components/ui/dialog';

type SearchDialogProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
};

const SearchDialog = ({ 
  isOpen, 
  onOpenChange, 
  searchQuery, 
  onSearchChange,
  onSubmit 
}: SearchDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <form onSubmit={onSubmit} className="space-y-4">
          <h2 className="text-xl font-serif">Search Products</h2>
          <div className="flex items-center border-b border-gray-300 py-2">
            <Search size={20} className="text-gray-400 mr-2" />
            <Input
              type="text"
              placeholder="Search for products..."
              className="flex-1 border-none focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
          <Button type="submit" className="w-full bg-luxe-charcoal hover:bg-luxe-black">
            Search
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SearchDialog;
