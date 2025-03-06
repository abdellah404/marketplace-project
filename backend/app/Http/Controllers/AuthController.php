<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

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
}
