<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\API\ResponseTrait;
use App\Models\ProductModel;


class Products extends ResourceController
{
  use ResponseTrait;

  /**
   * Return an array of resource objects, themselves in array format
   *
   * @return mixed
   */
  public function index()
  {
    $ProductModel = new ProductModel();
    $data = $ProductModel->findAll();

    return $this->respond($data);
  }

  /**
   * Return the properties of a resource object
   *
   * @return mixed
   */
  public function show($id = null)
  {
    $ProductModel = new ProductModel();
    $data = $ProductModel->find($id);

    if (!$data) return $this->failNotFound("No Data Found");

    return $this->respond($data);
  }

  /**
   * Create a new resource object, from "posted" parameters
   *
   * @return mixed
   */
  public function create()
  {
    helper(['form']);

    $rules = [
      'title' => 'required',
      'price' => 'required',
    ];

    if (!$this->validate($rules)) return $this->fail($this->validator->getErrors());

    $data = [
      'title' => $this->request->getVar('title'),
      'price' => $this->request->getVar('price'),
    ];

    $ProductModel = new ProductModel();
    $ProductModel->save($data);

    return $this->respondCreated([
      'status' => 201,
      'error' => null,
      'messages' => [
        'success' => 'Data Inserted',
      ]
    ]);
  }

  /**
   * Add or update a model resource, from "posted" properties
   *
   * @return mixed
   */
  public function update($id = null)
  {
    helper(['form']);

    $rules = [
      'title' => 'required',
      'price' => 'required',
    ];

    if (!$this->validate($rules)) return $this->fail($this->validator->getErrors());

    $data = [
      'title' => $this->request->getVar('title'),
      'price' => $this->request->getVar('price'),
    ];

    $ProductModel = new ProductModel();
    $data = $ProductModel->find($id);

    if (!$data) return $this->failNotFound("No Data Found");

    $ProductModel->update($id, $data);

    return $this->respondUpdated([
      'status' => 200,
      'error' => null,
      'messages' => [
        'success' => 'Data Updated',
      ]
    ]);
  }

  /**
   * Delete the designated resource object from the model
   *
   * @return mixed
   */
  public function delete($id = null)
  {
    $ProductModel = new ProductModel();
    $data = $ProductModel->find($id);

    if (!$data) return $this->failNotFound("No Data Found");

    $ProductModel->delete($id);

    return $this->respondDeleted([
      'status' => 200,
      'error' => null,
      'messages' => [
        'success' => 'Data Deleted',
      ]
    ]);
  }
}
