module.exports.swaggerDocument = {
    openapi: '3.0.1',
    info: {
        title: 'Animal Crossing Recipes',
        description: 'This is an Animal Crossing New Horizons API for getting recipes, materials, and finding all possible recipes you can make when provided a list of materials and their amount.',
        version: '1.0.0'
    },
    tags: [
        {
            name: 'Recipes'
        },
        {
            name: 'Materials'
        }
    ],
    paths: {
        '/recipes': {
            get: {
                tags: [
                    'Recipes'
                ],
                summary: 'Get all recipes',
                description: 'Get all recipes',
                parameters: [
                    {
                        name: 'materials',
                        'in': 'query',
                        description: 'If true, return all materials associated with each recipe',
                        required: true,
                        schema: {
                            type: 'string'
                        }
                    }
                ],
                responses: {
                    '200': {
                        description: 'successful operation',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'array',
                                    items: {
                                        $ref: '#/components/schemas/Recipe'
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        '/recipes/{id}': {
            get: {
                tags: [
                    'Recipes'
                ],
                summary: 'Get recipe by ID',
                parameters: [
                    {
                        name: 'id',
                        'in': 'path',
                        description: 'Recipe ID',
                        required: true,
                        schema: {
                            type: 'number'
                        }
                    }
                ],
                responses: {
                    '200': {
                        description: 'successful operation',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Recipe'
                                }
                            }
                        }
                    },
                    '404': {
                        description: 'Recipe not found',
                        content: {}
                    }
                }
            }
        },
        '/recipes/available': {
            post: {
                tags: [
                    'Recipes'
                ],
                summary: 'Find available recipes',
                description: 'Find all recipes you can craft based on materials',
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'array',
                                items: {
                                    type: 'object',
                                    properties: {
                                        name: {
                                            type: 'string'
                                        },
                                        amount: {
                                            type: 'number'
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                responses: {
                    '200': {
                        description: 'successful operation',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'array',
                                    items: {
                                        $ref: '#/components/schemas/Recipe'
                                    }
                                }
                            }
                        }
                    },
                    '400': {
                        description: 'Invalid payload provided',
                        content: {}
                    }
                }
            }
        },
        '/materials': {
            get: {
                tags: [
                    'Materials'
                ],
                summary: 'Get all materials',
                description: 'Get all materials',
                responses: {
                    '200': {
                        description: 'successful operation',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'array',
                                    items: {
                                        $ref: '#/components/schemas/Material'
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        '/materials/{id}': {
            get: {
                tags: [
                    'Materials'
                ],
                summary: 'Get material by ID',
                parameters: [
                    {
                        name: 'id',
                        'in': 'path',
                        description: 'Material ID',
                        required: true,
                        schema: {
                            type: 'number'
                        }
                    }
                ],
                responses: {
                    '200': {
                        description: 'successful operation',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Material'
                                }
                            }
                        }
                    },
                    '404': {
                        description: 'Material not found',
                        content: {}
                    }
                }
            }
        }
    },
    components: {
        schemas: {
            Recipe: {
                type: 'object',
                properties: {
                    id: {
                        type: 'integer',
                        format: 'int64'
                    },
                    name: {
                        type: 'string'
                    },
                    category: {
                        type: 'string'
                    },
                    image: {
                        type: 'string'
                    },
                    altImage: {
                        type: 'string'
                    },
                    materials: {
                        type: 'array',
                        items: {
                            $ref: '#/components/schemas/Material'
                        }
                    }
                }
            },
            Material: {
                type: 'object',
                properties: {
                    id: {
                        type: 'integer',
                        format: 'int64'
                    },
                    name: {
                        type: 'string'
                    },
                    image: {
                        type: 'string'
                    },
                    altImage: {
                        type: 'string'
                    }
                }
            }
        }
    }
};
