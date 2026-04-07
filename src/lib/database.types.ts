export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      agrupaciones: {
        Row: {
          category_slug: string
          created_at: string | null
          description: string | null
          discography: string[] | null
          gallery: string[] | null
          history: string | null
          id: string
          information: string | null
          name: string
          positions: string[] | null
          slug: string
          trivia: string[] | null
        }
        Insert: {
          category_slug: string
          created_at?: string | null
          description?: string | null
          discography?: string[] | null
          gallery?: string[] | null
          history?: string | null
          id?: string
          information?: string | null
          name: string
          positions?: string[] | null
          slug: string
          trivia?: string[] | null
        }
        Update: {
          category_slug?: string
          created_at?: string | null
          description?: string | null
          discography?: string[] | null
          gallery?: string[] | null
          history?: string | null
          id?: string
          information?: string | null
          name?: string
          positions?: string[] | null
          slug?: string
          trivia?: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: "agrupaciones_category_slug_fkey"
            columns: ["category_slug"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["slug"]
          },
        ]
      }
      carnaval_editions: {
        Row: {
          alt: string | null
          badge: string | null
          created_at: string | null
          id: string
          image: string | null
          intro: string | null
          title: string
          year: number
        }
        Insert: {
          alt?: string | null
          badge?: string | null
          created_at?: string | null
          id?: string
          image?: string | null
          intro?: string | null
          title: string
          year: number
        }
        Update: {
          alt?: string | null
          badge?: string | null
          created_at?: string | null
          id?: string
          image?: string | null
          intro?: string | null
          title?: string
          year?: number
        }
        Relationships: []
      }
      categories: {
        Row: {
          created_at: string | null
          id: string
          image: string | null
          info_alt: string | null
          info_badge: string | null
          info_description: string | null
          info_image: string | null
          name: string
          slug: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          image?: string | null
          info_alt?: string | null
          info_badge?: string | null
          info_description?: string | null
          info_image?: string | null
          name: string
          slug: string
        }
        Update: {
          created_at?: string | null
          id?: string
          image?: string | null
          info_alt?: string | null
          info_badge?: string | null
          info_description?: string | null
          info_image?: string | null
          name?: string
          slug?: string
        }
        Relationships: []
      }
      hero_frases: {
        Row: {
          active: boolean | null
          created_at: string | null
          id: string
          image: string
          sort_order: number | null
          subtitle: string | null
          title: string
        }
        Insert: {
          active?: boolean | null
          created_at?: string | null
          id?: string
          image: string
          sort_order?: number | null
          subtitle?: string | null
          title: string
        }
        Update: {
          active?: boolean | null
          created_at?: string | null
          id?: string
          image?: string
          sort_order?: number | null
          subtitle?: string | null
          title?: string
        }
        Relationships: []
      }
      menciones: {
        Row: {
          categoria: string | null
          edition_id: string
          ganadores: string[]
          id: string
          seccion: string | null
          tipo: string
          titulo: string
        }
        Insert: {
          categoria?: string | null
          edition_id: string
          ganadores: string[]
          id?: string
          seccion?: string | null
          tipo: string
          titulo: string
        }
        Update: {
          categoria?: string | null
          edition_id?: string
          ganadores?: string[]
          id?: string
          seccion?: string | null
          tipo?: string
          titulo?: string
        }
        Relationships: [
          {
            foreignKeyName: "menciones_edition_id_fkey"
            columns: ["edition_id"]
            isOneToOne: false
            referencedRelation: "carnaval_editions"
            referencedColumns: ["id"]
          },
        ]
      }
      novedades: {
        Row: {
          color: string | null
          content: string | null
          created_at: string | null
          date: string | null
          description: string | null
          id: string
          image: string | null
          title: string
        }
        Insert: {
          color?: string | null
          content?: string | null
          created_at?: string | null
          date?: string | null
          description?: string | null
          id: string
          image?: string | null
          title: string
        }
        Update: {
          color?: string | null
          content?: string | null
          created_at?: string | null
          date?: string | null
          description?: string | null
          id?: string
          image?: string | null
          title?: string
        }
        Relationships: []
      }
      puntajes: {
        Row: {
          categoria: string
          edition_id: string
          id: string
          nombre: string
          puesto: number
          puntos: number
        }
        Insert: {
          categoria: string
          edition_id: string
          id?: string
          nombre: string
          puesto: number
          puntos: number
        }
        Update: {
          categoria?: string
          edition_id?: string
          id?: string
          nombre?: string
          puesto?: number
          puntos?: number
        }
        Relationships: [
          {
            foreignKeyName: "puntajes_edition_id_fkey"
            columns: ["edition_id"]
            isOneToOne: false
            referencedRelation: "carnaval_editions"
            referencedColumns: ["id"]
          },
        ]
      }
      show_credits: {
        Row: {
          id: string
          names: string[]
          role: string
          show_id: string
        }
        Insert: {
          id?: string
          names: string[]
          role: string
          show_id: string
        }
        Update: {
          id?: string
          names?: string[]
          role?: string
          show_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "show_credits_show_id_fkey"
            columns: ["show_id"]
            isOneToOne: false
            referencedRelation: "shows"
            referencedColumns: ["id"]
          },
        ]
      }
      show_sections: {
        Row: {
          content: string | null
          id: string
          lyrics: string | null
          show_id: string
          sort_order: number | null
          title: string
        }
        Insert: {
          content?: string | null
          id?: string
          lyrics?: string | null
          show_id: string
          sort_order?: number | null
          title: string
        }
        Update: {
          content?: string | null
          id?: string
          lyrics?: string | null
          show_id?: string
          sort_order?: number | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "show_sections_show_id_fkey"
            columns: ["show_id"]
            isOneToOne: false
            referencedRelation: "shows"
            referencedColumns: ["id"]
          },
        ]
      }
      shows: {
        Row: {
          agrupacion_id: string
          created_at: string | null
          data: string | null
          gallery: string[] | null
          id: string
          image: string | null
          promotion_date: string | null
          slug: string
          title: string
          year: number | null
        }
        Insert: {
          agrupacion_id: string
          created_at?: string | null
          data?: string | null
          gallery?: string[] | null
          id?: string
          image?: string | null
          promotion_date?: string | null
          slug: string
          title: string
          year?: number | null
        }
        Update: {
          agrupacion_id?: string
          created_at?: string | null
          data?: string | null
          gallery?: string[] | null
          id?: string
          image?: string | null
          promotion_date?: string | null
          slug?: string
          title?: string
          year?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "shows_agrupacion_id_fkey"
            columns: ["agrupacion_id"]
            isOneToOne: false
            referencedRelation: "agrupaciones"
            referencedColumns: ["id"]
          },
        ]
      }
      static_content: {
        Row: {
          body: string | null
          id: string
          image: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          body?: string | null
          id: string
          image?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          body?: string | null
          id?: string
          image?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const

