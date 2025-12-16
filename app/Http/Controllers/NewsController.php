<?php

namespace App\Http\Controllers;

use App\Models\News;
use Illuminate\Http\Request;
use Inertia\Inertia;

class NewsController extends Controller
{
    // Страница (Inertia)
    public function page(Request $request)
    {
        $search = $request->query('search');

        $news = News::query()
            ->when($search, function ($query) use ($search) {
                $query->where('title', 'like', "%{$search}%")
                      ->orWhere('body', 'like', "%{$search}%");
            })
            ->orderByDesc('published_at')
            ->orderByDesc('created_at')
            ->get();

        return Inertia::render('LoggedMainPage', [
            'news' => $news,
            'filters' => [
                'search' => $search,
            ],
        ]);
    }

    // API (JSON)
    public function index(Request $request)
    {
        $search = $request->query('search');

        $items = News::query()
            ->when($search, function ($query) use ($search) {
                $query->where('title', 'like', "%{$search}%")
                      ->orWhere('body', 'like', "%{$search}%");
            })
            ->orderByDesc('published_at')
            ->orderByDesc('created_at')
            ->paginate(10);

        return response()->json($items);
    }
}
