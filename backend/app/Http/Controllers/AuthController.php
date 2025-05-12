<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Log;

class AuthController extends Controller
{
    //
    /**
     * @throws ValidationException
     */
    public function register(Request $request): JsonResponse
    {
        $this->validate($request, [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
        ]);
        $user  = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'city' => $request->city,
            'password' => Hash::make($request->password),
        ]);
        $token = $user->createToken('auth_token')->plainTextToken;
        return response()->json([
            'access_token' => $token,
            'token_type'   => 'Bearer',
            'user'   => $user,
        ]);
    }

    /**
     * @throws ValidationException
     */
    public function login(Request $request): JsonResponse
    {
        $this->validate($request,
            [
            'email' => 'required|string|email|max:255',
            'password' => 'required|string|min:6',
            ]
        );

        $user = User::where('email',$request->email)->first();
        if (! $user) {
            throw ValidationException::withMessages([
                'email' => ['email incorrect'],
            ]);
        }
        else if(! Hash::check($request->password,$user->password)){
            throw ValidationException::withMessages([
                'password' => ['password incorrect,try again !'],
            ]);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'access_token' => $token,
            'token_type'   => 'Bearer',
            'user'   => $user,
        ]);
    }
    // Retrieve the authenticated user
    public function user(Request $request)
    {
        return response()->json($request->user());
    }

    // Update the authenticated user
    public function update(Request $request)
    {
        $user = $request->user();

        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }

        $this->validate($request, [
            'name' => 'sometimes|string|max:255',
            'city' => 'sometimes|string|max:255',
            'phone' => 'sometimes|string|max:255',
        ]);

        $user->update($request->only(['name', 'city', 'phone']));
        return response()->json(["user" => $user]);
    }

    public function getUsers(Request $request)
    {
        $users = User::all();
        return response()->json($users);
    }

    public function deleteUser(Request $request, $id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }
        $user->delete();
        return response()->json(['message' => 'User deleted successfully']);
    }
}
