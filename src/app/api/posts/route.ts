import { connectDB } from '@/lib/db';
import Post from '@/models/Post';
import mongoose from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';

// TODO: For sensitive data like userId, JWTs or secure cookies are the most secure and scalable solutions.

export async function getPosts(req: NextRequest) {
  await connectDB();
  //   query params is in the correct format
  const userId = req.nextUrl.searchParams.get('userId');
  if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
    return NextResponse.json({ error: 'User Id is required.' }, { status: 400 });
  }

  try {
    const posts = await Post.find({ postedBy: { $ne: userId } });
    if (!posts || posts.length === 0) {
      return NextResponse.json({ error: 'No Posts to Display.' }, { status: 200 });
    }
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to load Posts.' }, { status: 500 });
  }
}

export async function getUserPosts(req: NextRequest) {
  await connectDB();
  const userId = req.nextUrl.searchParams.get('userId');
  if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
    return NextResponse.json({ error: 'User Id is required.' }, { status: 400 });
  }

  try {
    const posts = await Post.find({ postedBy: userId });
    if (!posts || posts.length === 0) {
      return NextResponse.json({ error: 'No Posts to display.' }, { status: 200 });
    }
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to load Posts.' }, { status: 500 });
  }
}

export async function createPost(req: NextRequest) {
  await connectDB();
  const userId = req.nextUrl.searchParams.get('userId');
  if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
    return NextResponse.json({ error: 'Please Login.' }, { status: 400 });
  }
  try {
    const post = req.body();
    if (!post.content && !post.image) {
      return NextResponse.json({ error: 'Content or Image is required.' }, { status: 400 });
    }

    const newPost = new Post({
      content: post.content,
      image: post.image,
      postedBy: userId,
    });

    await newPost.save();
    return NextResponse.json(newPost);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to Add Post.' }, { status: 500 });
  }
}

export async function updatePost(req: NextRequest) {
  await connectDB();
  const userId = req.nextUrl.searchParams.get('userId');
  if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
    return NextResponse.json({ error: 'Please Login.' }, { status: 400 });
  }

  const postId = req.nextUrl.searchParams.get('postId');
  if (!postId || !mongoose.Types.ObjectId.isValid(postId)) {
    return NextResponse.json({ error: 'Post Id is required.' }, { status: 400 });
  }

  try {
    const post = req.body();
    if (!post.content && !post.image) {
      return NextResponse.json({ error: 'Content or Image is required.' }, { status: 400 });
    }

    const updatedPost = await Post.findByIdAndUpdate(postId, post, { new: true });
    if (!updatedPost) {
      return NextResponse.json({ error: 'Post not found.' }, { status: 404 });
    }
    return NextResponse.json(updatedPost);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to Update Post.' }, { status: 500 });
  }
}

export async function deletePost(req: NextRequest) {
  await connectDB();

  const userId = req.nextUrl.searchParams.get('userId');
  if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
    return NextResponse.json({ error: 'Please Login.' }, { status: 400 });
  }

  const postId = req.nextUrl.searchParams.get('postId');
  if (!postId || !mongoose.Types.ObjectId.isValid(postId)) {
    return NextResponse.json({ error: 'Post Id is required.' }, { status: 400 });
  }

  try {
    const deletePost = await Post.findByIdAndDelete(postId);
    if (!deletePost) {
      return NextResponse.json({ error: 'Post not found.' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Post deleted successfully.' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to Update Post.' }, { status: 500 });
  }
}

export async function likePost(req: NextRequest) {
  await connectDB();

  const userId = req.nextUrl.searchParams.get('userId');
  if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
    return NextResponse.json({ error: 'Please Login.' }, { status: 400 });
  }

  const postId = req.nextUrl.searchParams.get('postId');
  if (!postId || !mongoose.Types.ObjectId.isValid(postId)) {
    return NextResponse.json({ error: 'Post Id is required.' }, { status: 400 });
  }

  try {
    // toggle like using atomic update
    
    const updatedPost = await Post.findOneAndUpdate(
        {_id: postId},
        {
            $addToSet: {likes: userId},   // add UserId if not present
            $pull: { likes: userId },     // Removes userId if not present
        },
        {new: true}
    )

    if (!updatePost) {
        return NextResponse.json({ error: 'Post not found.' }, { status: 404 });
      }

    return NextResponse.json(updatedPost);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to Update Post.' }, { status: 500 });
  }
}

export async function commentPost(req: NextRequest) {
  await connectDB();

  const userId = req.nextUrl.searchParams.get('userId');
  if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
    return NextResponse.json({ error: 'Please Login.' }, { status: 400 });
  }

  const postId = req.nextUrl.searchParams.get('postId');
  if (!postId || !mongoose.Types.ObjectId.isValid(postId)) {
    return NextResponse.json({ error: 'Post Id is required.' }, { status: 400 });
  }

  try {
    const post = await Post.findById(postId);
    if (!post) {
      return NextResponse.json({ error: 'Post not found.' }, { status: 404 });
    }

    const comment = req.body();
    if (!comment.comment) {
      return NextResponse.json({ error: 'Comment is required.' }, { status: 400 });
    }

    const updatedPost = await Post.findOneAndUpdate(
      { _id: postId },
      { $push: { comments: { commentedBy: userId, comment: comment.comment } } },
      { new: true },
    );
    return NextResponse.json(updatedPost);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to Update Post.' }, { status: 500 });
  }
}
