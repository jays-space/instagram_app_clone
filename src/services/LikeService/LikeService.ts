import {useMutation, useQuery} from '@apollo/client';
import {
  CreateLikeMutation,
  CreateLikeMutationVariables,
  DeleteLikeMutation,
  DeleteLikeMutationVariables,
  LikesForPostByUserQuery,
  LikesForPostByUserQueryVariables,
  Post,
  UpdatePostMutation,
  UpdatePostMutationVariables,
} from '../../API';
import {useAuthContext} from '../../contexts/AuthContext';
import {
  createLike,
  deleteLike,
  likesForPostByUser,
  updatePost,
} from './queries';

const useLikeService = (post: Post) => {
  const {currentUserId} = useAuthContext();

  // on component render, fetch all likes by this user for this post
  const {data: usersLikeData} = useQuery<
    LikesForPostByUserQuery,
    LikesForPostByUserQueryVariables
  >(likesForPostByUser, {
    variables: {postID: post?.id, userID: {eq: currentUserId}},
  });

  const currentUserLike = usersLikeData?.LikesForPostByUser?.items?.filter(
    like => !like?._deleted,
  )?.[0]; // a like by the current user => if there is not data at [0], the we return undefined (falsy value)

  const [onUpdatePost] = useMutation<
    UpdatePostMutation,
    UpdatePostMutationVariables
  >(updatePost);

  const incrementNofLikes = (amount: 1 | -1) => {
    onUpdatePost({
      variables: {
        input: {
          id: post?.id,
          _version: post?._version,
          nofLikes: post?.nofLikes + amount,
        },
      },
    });
  };

  // on like create, create the like then refetch LikesForPostByUser
  const [onCreateLike] = useMutation<
    CreateLikeMutation,
    CreateLikeMutationVariables
  >(createLike, {
    variables: {input: {userID: currentUserId, postID: post?.id}}, // gets all likes by the current user for this post
    refetchQueries: ['LikesForPostByUser'], // an arr of queries to run after this mutation likes CRUD (15:00:00)
  });

  const [onDeletePost] = useMutation<
    DeleteLikeMutation,
    DeleteLikeMutationVariables
  >(deleteLike, {refetchQueries: ['LikesForPostByUser']});

  const onLike = () => {
    onCreateLike();
    incrementNofLikes(1);
  };
  const onUnlike = () => {
    if (!currentUserLike) {
      return;
    }

    onDeletePost({
      variables: {
        input: {id: currentUserLike?.id, _version: currentUserLike?._version},
      },
    });
    incrementNofLikes(-1);
  };

  const toggleLike = () => {
    if (currentUserLike) {
      // if the current user likes, delete the like
      onUnlike();
    } else {
      // if the current user does not like, create the like
      onLike();
    }
  };

  return {
    toggleLike,
    isLiked: !!currentUserLike,
  };
};

export default useLikeService;
