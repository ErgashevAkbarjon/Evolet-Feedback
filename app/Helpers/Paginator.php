<?php

namespace App\Helpers;

use Illuminate\Contracts\Support\Arrayable;
use Illuminate\Support\Collection;

class Paginator implements Arrayable {

    const DEFAULT_PAGE = 1;
    const DEFAULT_ITEMS_PER_PAGE = 10;

    private $items;

    private $perPage;

    private $currentPage;

    public function __construct(Collection $items, $perPage, $currentPage) {
        $this->items = $items;
        $this->perPage = $perPage ?: self::DEFAULT_ITEMS_PER_PAGE;
        $this->currentPage = $currentPage ?: self::DEFAULT_PAGE;
    }

    public function toArray()
    {
        return [
            "currentPage" => $this->currentPage,
            "totalPages" => intval($this->items->count() / $this->perPage),
            "data" => $this->items->forPage($this->currentPage, $this->perPage)->values()
        ];
    }

    public function getData()
    {
        return $this->items;
    }

    public function setData($data)
    {
        $this->items = $data;
    }
}