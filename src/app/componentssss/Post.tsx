import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { BookmarkIcon, CircleArrowRight, MessageCirclePlusIcon, Share2Icon, ThumbsUpIcon } from 'lucide-react';
import React from 'react';

const Post = () => {
  return (
    <div className="bg-black">
      <div className="mx-auto px-[20px] max-w-[1200px]">
        <div className="h-full py-5 px-6">
          <div className="flex justify-between items-center">
            <div className="flex justify-start items-center gap-5">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>

              <div className="text-gray-200 font-semibold text-xl">Naman Chandra</div>
            </div>

            <Button variant="ghost" className="rounded-none text-xl font-bold text-white">
              <BookmarkIcon className="" />
            </Button>
          </div>

          <div className="flex flex-col justify-center items-start mt-4 gap-5">
            <AspectRatio ratio={10 / 5} className="bg-muted">
              <img
                src="https://images.unsplash.com/photo-1709884735626-63e92727d8b6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZnJlZSUyMGltYWdlc3xlbnwwfHwwfHx8MA%3D%3D"
                alt="Photo by Drew Beamer"
                className="h-full w-full rounded object-cover"
              />
            </AspectRatio>

            <div className="text-gray-200 text-base font-sans">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam inventore ullam
              ipsum! Error commodi totam fugit accusamus impedit dicta molestiae! Lorem ipsum dolor
              sit amet consectetur adipisicing elit. Perspiciatis dolorum officiis molestias dolorem
              amet adipisci nobis odit ad quia voluptates.
            </div>
          </div>

          <div className="flex justify-start items-center mt-2">
            <Button variant="ghost" className="rounded-none text-xl font-bold text-white">
              <ThumbsUpIcon />
            </Button>

            <Button variant="ghost" className="rounded-none text-xl font-bold text-white">
              <MessageCirclePlusIcon />
            </Button>

            <Button variant="ghost" className="rounded-none text-xl font-bold text-white">
              <Share2Icon />
            </Button>
          </div>

        
        <div className="mt-2 relative">
          <Textarea className='resize-none bg-gray-900 font-semibold text-4xl text-gray-200 border-none focus:ring-0 focus:outline-none' placeholder="Type your message here...." >

          </Textarea>
          <Button variant="ghost" className=" p-4 absolute bottom-0 right-0 rounded-none text-xl font-bold text-white">
            <CircleArrowRight size={32}/>
            </Button>
        </div>

        <div className="flex justify-start items-center gap-5 mt-4 mx-2">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>

              <div className="text-gray-200 font-semibold text-xl">Naman Chandra</div>
            </div>



        </div>
      </div>
    </div>
  );
};

export default Post;
