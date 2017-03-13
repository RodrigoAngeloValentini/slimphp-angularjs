<?php
namespace App\Controller;

use App\Entity\Photo;
use Interop\Container\ContainerInterface;

class HomeController
{
    protected $container;

    public function __construct(ContainerInterface $container) {
        $this->container = $container;
    }

    public function index($request, $response, $args) {

        if($request->isGet()){
            $em = $this->container->get('em');
            try{
                $photos = $em->getRepository('App\Entity\Photo')->findAll();

                $photos = array_map(
                    function($photo){
                        return $photo->getArrayCopy();
                    },$photos
                );

                return $response->withJSON($photos);
            } catch (\Exception $e){
                return $response->withJSON(['status'=>false,'error'=>$e->getMessage()]);
            }
        }
    }

    public function save($request, $response, $args){

        if($request->isPost()){
            $em = $this->container->get('em');
            try{
                $body = $request->getParsedBody();
                $title = $body['title'];

                $photo = new Photo();
                $photo->setTitle($title);
                $em->persist($photo);
                $em->flush();

                return $response->withJSON(['status'=>true]);
            } catch (\Exception $e){
                return $response->withJSON(['status'=>false,'error'=>$e->getMessage()]);
            }
        }
    }

    public function get($request, $response, $args){
        if($request->isGet()){
            $em = $this->container->get('em');
            try{
                $id = $args['id'];
                $body = $request->getParsedBody();
                $photos = $em->getRepository('App\Entity\Photo')->find($id);

                if($photos){

                    $photos = array_map(
                        function($photo){
                            return $photo->getArrayCopy();
                        },$photos
                    );

                    return $response->withJSON(['status'=>true,'photos'=>$photos]);
                }else{
                    return $response->withJSON(['status'=>false]);
                }

            } catch (\Exception $e){
                return $response->withJSON(['status'=>false,'error'=>$e->getMessage()]);
            }
        }
    }

    public function edit($request, $response, $args){
        if($request->isPut()){
            $em = $this->container->get('em');
            try{
                $id = $args['id'];
                $body = $request->getParsedBody();
                $photo = $em->getRepository('App\Entity\Photo')->find($id);

                if($photo){
                    $title = $body['title'];

                    $photo = $em->getReference('App\Entity\Photo',$id);
                    $photo->setTitle($title);
                    $em->persist($photo);
                    $em->flush();

                    return $response->withJSON(['status'=>true]);
                }else{
                    return $response->withJSON(['status'=>false]);
                }

            } catch (\Exception $e){
                return $response->withJSON(['status'=>false,'error'=>$e->getMessage()]);
            }
        }
    }

    public function delete($request, $response, $args){
        if($request->isDelete()){
            $em = $this->container->get('em');
            try{
                $id = $args['id'];
                $photo = $em->getRepository('App\Entity\Photo')->find($id);

                if($photo){
                    $entity = $em->getReference('App\Entity\Photo',$id);
                    $em->remove($entity);
                    $em->flush();
                    return $response->withJSON(['status'=>true]);
                }else{
                    return $response->withJSON(['status'=>false]);
                }

            } catch (\Exception $e){
                return $response->withJSON(['status'=>false,'error'=>$e->getMessage()]);
            }
        }
    }
}