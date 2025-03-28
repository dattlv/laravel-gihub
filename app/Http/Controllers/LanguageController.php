<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;

class LanguageController extends Controller
{
    public function switchLang($lang)
    {
        $availableLocales = ['en', 'vi'];

        if (in_array($lang, $availableLocales)) {
            session(['locale' => $lang]);
        }

        return redirect()->back();
    }
}
