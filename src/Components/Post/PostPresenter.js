import React from "react";
import styled from "styled-components";
import TextareaAutosize from "react-autosize-textarea";
import Avatar from "../Avatar";
import FatText from "../FatText";
import { Comment as CommentIcon, HeartEmpty, HeartFull } from "../Icons";
import { Link } from "react-router-dom";

const Post = styled.div`
  ${(props) => props.theme.whiteBox}
  width: 100%;
  max-width: 600px;
  margin-bottom: 25px;
  user-select: none;
  a {
    color: inherit;
  }
`;

const Header = styled.header`
  padding: 15px;
  display: flex;
  align-items: center;
`;

const UserColumn = styled.div`
  margin-left: 10px;
`;

const Location = styled.span`
  display: block;
  margin-top: 5px;
  font-size: 12px;
`;

const Files = styled.div`
  width: 100%;
  height: 600px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: whitesmoke;
`;

const File = styled.img`
  max-width: 100%;
  height: 600px;
  position: absolute;
  top: 0;
  opacity: ${(props) => (props.showing ? 1 : 0)};
  transition: opacity 0.5s linear;
`;

const Button = styled.span`
  cursor: pointer;
`;

const Meta = styled.div`
  padding: 15px;
`;

const Buttons = styled.div`
  ${Button} {
    &:first-child {
      margin-right: 10px;
    }
  }
  margin-bottom: 10px;
`;

const Timestamp = styled.span`
  font-weight: 400;
  text-transform: uppercase;
  opacity: 0.7;
  display: block;
  font-size: 12px;
  margin: 10px 0px;
  padding-bottom: 10px;
  border-bottom: ${(props) => props.theme.lightGreyColor} 1px solid;
`;

const Textarea = styled(TextareaAutosize)`
  border: none;
  width: 100%;
  resize: none;
  font-size: 14px;
  &:focus {
    outline: none;
  }
`;

const Comments = styled.ul`
  margin-top: 10px;
`;

const Comment = styled.li`
  margin-bottom: 7px;
  span {
    margin-right: 5px;
  }
`;

export default ({
  id,
  user: { userName, avatar },
  location,
  files,
  isLiked,
  likeCount,
  createdAt,
  newComment,
  currentItem,
  toggleLike,
  caption,
  onKeyPress,
  comments,
  selfComments,
}) => {
  return (
    <Post>
      <Header>
        <Avatar size="sm" url={avatar} />
        <UserColumn>
          <Link to={`/${userName}`}>
            <FatText text={userName} />
          </Link>
          <Location>{location}</Location>
        </UserColumn>
      </Header>
      <Files>
        {files &&
          files.map((file, index) => (
            <File
              id={file.id}
              key={file.id}
              src={file.url}
              showing={index === currentItem}
            />
          ))}
      </Files>
      <Meta>
        <Buttons>
          <Button onClick={toggleLike}>
            {isLiked ? <HeartFull /> : <HeartEmpty />}{" "}
          </Button>
          <Button>
            <CommentIcon />
          </Button>
        </Buttons>
        <FatText text={likeCount === 1 ? "1 like" : `${likeCount} likes`} />

        <Comments>
          <Comment>
            <FatText text={userName} />
            {caption}
          </Comment>
          {comments &&
            comments.map((comment) => (
              <Comment key={comment.id}>
                <FatText text={comment.user.userName} />
                {comment.text}
              </Comment>
            ))}
          {selfComments.map((comment) => (
            <Comment key={comment.id}>
              <FatText text={comment.user.userName} />
              {comment.text}
            </Comment>
          ))}
        </Comments>
        <Timestamp>{createdAt.slice(0, 10)}</Timestamp>
        <Textarea
          placeholder={"Add a comment..."}
          value={newComment.value}
          onChange={newComment.onChange}
          onKeyPress={onKeyPress}
        />
      </Meta>
    </Post>
  );
};
