import React from 'react';
import {gql, useMutation, useQuery} from "@apollo/client";
import { toast } from 'react-toastify';
import {submitAction} from "../helpers/misc";
import {Table} from "react-bootstrap";
import moment from 'moment'

interface createPostObject {
    title: string
}

let createPostData: createPostObject = {
    title: ''
};

const CREATE_POST_MUTATION = gql`
    mutation CreatePostMutation($createPostData: CreatePostInputType!){
        createPost(createPostData: $createPostData){
            id
            title
            createdAt
            creator{
                id
                name
            }
        }
    }
`
const POSTS_QUERY = gql`
    {
        posts{
            id
            title
            createdAt
            creator{
                id
                name
            }
        }
    }
`

const Posts = () => {

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        createPostData.title = e.target.value

    }

    let { loading: postsLoading, error: postsError , data: postsData } = useQuery(POSTS_QUERY);
    let [createPost, { loading: createPostLoading, error: createPostError }] =
        useMutation(CREATE_POST_MUTATION, {
            refetchQueries: [
                {query: POSTS_QUERY}
            ]
        });

    if (createPostLoading || postsLoading) {
        toast('Loading ...')
    }

    if (createPostError) {
        toast(createPostError.message)
    }

    if (postsError) {
        toast(postsError.message)
    }


    const addPosts = () => {

        if (postsData) {
            console.log({postsData})
            return (
                <div style={{width: '100%', marginTop: '5vh'}}>
                    <Table striped bordered hover responsive style={{width: '100%'}}>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>post title</th>
                            <th>created At</th>
                            <th>creator name</th>
                        </tr>
                        </thead>
                        <tbody>
                        {postsData.posts.map((a:any) => {
                            return (
                                <tr>
                                    <td style={{textAlign: 'center'}}>{a.id}</td>
                                    <td style={{textAlign: 'center'}}>{a.title}</td>
                                    <td style={{textAlign: 'center'}}>{moment(a.createdAt).fromNow()}</td>
                                    <td style={{textAlign: 'center'}}>{a.creator.name}</td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </Table>
                </div>
            )
        }

    }

    return (
        <>

            <div className="wrap-login100">
                <div className="login100-pic js-tilt" data-tilt>
                    <img src="/images/img-01.png" alt="IMG"/>
                </div>

                <form id="login-form"
                      className="login100-form validate-form"
                      onSubmit={(e) => submitAction(e, createPostData, 'createPostData', createPost)}
                >
					<span className="login100-form-title">
						Member CreatePost
					</span>

                    <div id='email-validation' className="wrap-input100">
                        <input className="input100" type="text" name="title" placeholder="title" onBlur={handleInputChange}/>
                        <span className="focus-input100"></span>
                        <span className="symbol-input100">
							<i className="fa fa-envelope" aria-hidden="true"></i>
						</span>

                    </div>

                    <div className="container-login100-form-btn">
                        <button className="login100-form-btn">
                            CreatePost
                        </button>
                    </div>

                </form>
                {addPosts()}
            </div>
        </>
    );
};

export default Posts;
