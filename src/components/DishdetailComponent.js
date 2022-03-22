import React from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
 
    function RenderDish({dish}) {
        if(dish != null) {
            return (
                <div className="col-12 col-md-5 m-1">
                    <Card>
                        <CardImg top src={dish.image} alt={dish.name} />
                        <CardBody>
                            <CardTitle> {dish.name} </CardTitle>
                            <CardText> {dish.description} </CardText>
                        </CardBody>
                    </Card>
                </div>
            );
        }
            else {
                return (
                    <div>
                    </div>
                );
            }
    }

    function RenderComments({comments}) {
        if(comments == null) {
            return (
                <div></div>
            );
        }
        const comnts = comments.map((comment) => {
            return (
                <li key={comment.id}>
                    <p>{comment.comment}</p>
                    <p>{comment.author},
                    &nbsp;
                   {/* {comment.date} */}

                   {/* Date format Changing */}
                   {
                       new Intl.DateTimeFormat('en-US',
                       {
                           year: 'numeric',
                           month: 'long',
                           day: '2-digit'
                       }).format(new Date(comment.date))
                   }
                    </p>
                </li>
            );

        });
        return (
            <div className="col-12 col-md-5 m-1">
                <h4> Comments </h4>
                <ul className="list-unstyled">
                    {comnts}
                </ul>
            </div>
        );
    }
    
   const DishDetail = (props) => {

        const dish = props.dish;

        if(dish == null) {
            return(
                <div></div>
            );
        }
 
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>                
                </div>
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={props.dish} />
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <RenderComments comments={props.comments} />
                    </div>
                </div>
                </div>
        );
    }


export default DishDetail;