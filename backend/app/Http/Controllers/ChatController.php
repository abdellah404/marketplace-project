<?php

namespace App\Http\Controllers;

use App\Events\NewChatMessage;
use App\Models\Message;
use Auth;
use Illuminate\Http\Request;

class ChatController extends Controller
{
    public function getMessages($receiverId)
    {
        $userId = Auth::id();

        return Message::where(function($query) use ($userId, $receiverId) {
            $query->where('sender_id', $userId)
                  ->where('receiver_id', $receiverId);
        })->orWhere(function($query) use ($userId, $receiverId) {
            $query->where('sender_id', $receiverId)
                  ->where('receiver_id', $userId);
        })->with(['sender', 'receiver'])->orderBy('created_at', 'asc')->get();
    }

    public function sendMessage(Request $request)
    {
        $message = Message::create([
            'sender_id' => Auth::id(),
            'receiver_id' => $request->receiver_id,
            'message' => $request->message
        ]);

        broadcast(new NewChatMessage($message))->toOthers();

        return response()->json($message->load('sender'));
    }

    public function markAsRead($messageId)
    {
        $message = Message::findOrFail($messageId);
        if ($message->receiver_id == Auth::id()) {
            $message->update(['read' => true]);
        }
        return response()->json(['success' => true]);
    }

}
