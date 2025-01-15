import { createClient } from '@supabase/supabase-js'

    const supabaseUrl = 'https://kpfxeuijerwuwqntxypy.supabase.co'
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtwZnhldWlqZXJ3dXdxbnR4eXB5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY5MzYyNjQsImV4cCI6MjA1MjUxMjI2NH0.rNFKwsZRhH_8aYAJv_nRqCBiYOw19r5EMQNVFd-QG7g'
    const supabase = createClient(supabaseUrl, supabaseKey)

    async function testConnection() {
      try {
        const { data, error } = await supabase
          .from('your_table_name')
          .select('*')
          .limit(1)
        
        if (error) throw error
        console.log('Conexão bem-sucedida! Dados:', data)
      } catch (error) {
        console.error('Erro na conexão:', error)
      }
    }

    testConnection()
