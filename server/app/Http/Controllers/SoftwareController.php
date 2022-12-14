<?php

namespace App\Http\Controllers;

use App\Http\Requests\SoftwareRequest;
use App\Models\Midia;
use App\Models\Software;
use Ramsey\Uuid\Uuid;
use Exception;
// use Illuminate\Http\Request;

class SoftwareController extends Controller
{
  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function index()
  {
    try {
      $software = Software::all()->toArray();
    } catch (\Exception $e) {
      return response()->json([
        'message' => 'Erro ao listar softwares',
        'error' => $e->getMessage()
      ], 500);
    }

    return response()->json($software);
  }

  /**
   * Store a newly created resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return \Illuminate\Http\Response
   */
  public function store(SoftwareRequest $request)
  {
    try {
      $software = Software::create($request->all());
      if ($request->hasFile('image')) {
        $destinationPath = "public/images/software";
        $extension = $request->image->getClientOriginalExtension();
        $name = Uuid::uuid1();
        $path['image'] = $request->file('image')->storeAs($destinationPath, $name . ".{$extension}");
        $software->image = $name . "." . $extension;
        $software->save();
      }
      if ($request->hasFile('video')) {
        $destinationPath = "public/videos/software";
        $extension = $request->video->getClientOriginalExtension();
        $name = Uuid::uuid1();
        $path['video'] = $request->file('video')->storeAs($destinationPath, $name . ".{$extension}");
        $software->video = $name . "." . $extension;
        $software->save();
      }
    } catch (\Exception $e) {
      return response()->json([
        'message' => 'Erro ao cadastrar software',
        'error' => $e->getMessage()
      ], 500);
    }

    return response()->json([
      'message' => 'Software cadastrado com sucesso',
      'software' => $software,
    ], 201);
  }

  /**
   * Display the specified resource.
   *
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function show($id)
  {
    try {
      $software = Software::findOrFail($id)->toArray();
    } catch (\Exception $e) {
      return response()->json([
        'message' => 'Erro ao listar software',
        'error' => $e->getMessage()
      ], 404);
    }
    return response()->json($software, 201);
  }

  /**
   * Update the specified resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function update(SoftwareRequest $request, $id)
  {
    try {
      $software = Software::findOrFail($id);
      $software->update($request->all());
      if ($software->image) {
        $destinationPath = "public/images/software";
        $extension = $request->image->getClientOriginalExtension();
        $name = Uuid::uuid1();
        $path['image'] = $request->file('image')->storeAs($destinationPath, $name . ".{$extension}");
        $software->image = $name . "." . $extension;
        $software->update();
      }
      if ($software->video) {
        $destinationPath = "public/videos/software";
        $extension = $request->image->getClientOriginalExtension();
        $name = Uuid::uuid1();
        $path['video'] = $request->file('video')->storeAs($destinationPath, $name . ".{$extension}");
        $software->video = $name . "." . $extension;
        $software->update();
      }
    } catch (\Exception $e) {
      return response()->json([
        'message' => 'Erro ao atualizar software',
        'error' => $e->getMessage()
      ], 500);
    }

    return response()->json([
      'message' => 'Software atualizado com sucesso',
      'software' => $software,
    ], 201);
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function destroy($id)
  {
    try {
      $software = Software::findOrFail($id);
      $software->delete();
    } catch (\Exception $e) {
      return response()->json([
        'message' => 'Erro ao deletar software',
        'error' => $e->getMessage()
      ], 500);
    }

    return response()->json([
      'message' => 'Software deletado com sucesso',
    ], 201);
  }
}
